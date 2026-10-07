const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

// Mock browser / RPG Maker environment
const sandbox = {
  $dataCommonEvents: JSON.parse(fs.readFileSync('game_data/game/js/libs/json/CommonEvents.json')),
  $gameSystem: {},
  $gameVariables: {
    _data: [],
    value: function (id) { return this._data[id] || 0; },
    setValue: function (id, v) { this._data[id] = v; }
  },
  $gameTemp: {},
  $gameActors: {
    _actor: {
      _actorId: 2,
      _hp: 500,
      _mp: 50,
      mhp: 1000,
      mmp: 200,
      isActor: function () { return true; },
      actorId: function () { return this._actorId; },
      refresh: function () {},
      gainHp: function (v) { this._hp = Math.min(this._hp + v, this.mhp); },
      gainMp: function (v) { this._mp = Math.min(this._mp + v, this.mmp); }
    },
    actor: function (id) { return id === 2 ? this._actor : null; }
  },
  $gameMessage: {
    setChoices: function (c) { this._choices = c; },
    setChoiceCallback: function (cb) { this._cb = cb; }
  },
  TickerManager: {
    _last: '',
    show: function (text) { this._last = text; return text; }
  },
  Game_Enemy: function () {},
  Game_Actor: function () {},
  Game_Interpreter: function () {},
  Game_Action: function () {},
  DataManager: {},
  Spriteset_Map: function () {},
  Graphics: { width: 540, height: 960 }
};

sandbox.Game_Actor.prototype = {
  actorId: function () { return 2; },
  paramPlus: function () { return 0; },
  paramMax: function () { return 999999; },
  finalExpRate: function () { return 1; },
  gainExp: function () {},
  changeExp: function () {},
  isBattleMember: function () { return true; },
  benchMembersExpRate: function () { return 1; }
};
sandbox.Game_Interpreter.prototype = {
  command315: function () {},
  operateValue: function (op, type, val) { return val; },
  iterateActorEx: function (p1, p2, cb) { cb(sandbox.$gameActors.actor(2)); }
};
sandbox.Game_Action.prototype = {
  executeHpDamage: function () {}
};
sandbox.DataManager.extractSaveContents = function () {};
sandbox.Spriteset_Map.prototype = {
  updateParallax: function () {}
};

const xiaoCode = fs.readFileSync('game_data/game/js/plugins/Xiao_SJ.js', 'utf8');
vm.createContext(sandbox);
vm.runInContext(xiaoCode, sandbox);

const WebTalent = sandbox.WebTalent;
assert(WebTalent, 'WebTalent must be defined');

// 1. Verify 4 qualities
console.log('1. Testing 4 qualities...');
const meta1 = WebTalent.getTalentMeta(103);
assert.strictEqual(meta1.tier, 1);
assert.strictEqual(meta1.qualityName, 'Lục');

const meta2 = WebTalent.getTalentMeta(203);
assert.strictEqual(meta2.tier, 2);
assert.strictEqual(meta2.qualityName, 'Lam');

const meta3 = WebTalent.getTalentMeta(303);
assert.strictEqual(meta3.tier, 3);
assert.strictEqual(meta3.qualityName, 'Tử');

const meta4 = WebTalent.getTalentMeta(403);
assert.strictEqual(meta4.tier, 4);
assert.strictEqual(meta4.qualityName, 'Hồng');

// 2. Testing 5 secondary types & exact ranges for each tier over 1000 rolls
console.log('2. Testing 5 secondary attribute ranges...');
const typesSeen = new Set();
for (let tier = 1; tier <= 4; tier++) {
  const ranges = {
    1: { hp: [2000, 8000], atk: [100, 500], mp: [1000, 5000], exp: [25, 100], lifesteal: [1, 3] },
    2: { hp: [8000, 20000], atk: [500, 1500], mp: [5000, 15000], exp: [100, 250], lifesteal: [3, 7] },
    3: { hp: [20000, 35000], atk: [1500, 4000], mp: [15000, 30000], exp: [250, 500], lifesteal: [7, 15] },
    4: { hp: [35000, 50000], atk: [4000, 8000], mp: [30000, 50000], exp: [500, 800], lifesteal: [15, 25] }
  }[tier];

  for (let i = 0; i < 500; i++) {
    const sec = WebTalent.rollSecondary(tier);
    typesSeen.add(sec.type);
    assert(ranges[sec.type], 'Unknown type ' + sec.type);
    const [min, max] = ranges[sec.type];
    assert(sec.value >= min && sec.value <= max,
      `Tier ${tier} ${sec.type} out of bounds: ${sec.value} not in [${min}, ${max}]`);
    assert(sec.text.includes('Thuộc tính phụ:'), 'Secondary text missing prefix');
  }
}
assert.strictEqual(typesSeen.size, 5, 'Must have exactly 5 secondary types');

// 3. Testing Primary Attribute logic & Archetypes
console.log('3. Testing Primary Attribute archetypes and values...');
const infoAtk = WebTalent.getTalentInfo(403, 4); // Thiên sinh thần lực
assert.strictEqual(infoAtk.mainBonus.atk, 6000);
assert(infoAtk.mainBonus.text.includes('Công kích +6.000'));

const infoHp = WebTalent.getTalentInfo(404, 4); // mình đồng da sắt
assert.strictEqual(infoHp.mainBonus.hp, 40000);
assert(infoHp.mainBonus.text.includes('HP +40.000'));

const infoExp = WebTalent.getTalentInfo(337, 3); // luyện võ kỳ tài
assert.strictEqual(infoExp.mainBonus.exp, 350);
assert(infoExp.mainBonus.text.includes('Kinh nghiệm +350%'));

// Tier 1 special must have non-empty bonus
const infoSpecialT1 = WebTalent.getTalentInfo(112, 1);
assert.strictEqual(infoSpecialT1.mainBonus.hp, 2500);
assert.strictEqual(infoSpecialT1.mainBonus.atk, 150);
assert(infoSpecialT1.mainBonus.text.length > 0);

// 4. Testing EXP scaling logic
console.log('4. Testing EXP bonus calculations...');
// Mock active stats with different exp bonuses
sandbox.$gameSystem._talentData = { mainBonus: {}, secondary: { type: 'exp', value: 100 } };
assert.strictEqual(WebTalent.calculateExp(1000), 2000, '+100% must give x2');

sandbox.$gameSystem._talentData = { mainBonus: {}, secondary: { type: 'exp', value: 500 } };
assert.strictEqual(WebTalent.calculateExp(1000), 6000, '+500% must give x6');

sandbox.$gameSystem._talentData = { mainBonus: {}, secondary: { type: 'exp', value: 800 } };
assert.strictEqual(WebTalent.calculateExp(1000), 9000, '+800% must give x9');

// 5. Testing Lifesteal mechanics
console.log('5. Testing Lifesteal combat mechanics...');
sandbox.$gameSystem._talentData = { mainBonus: {}, secondary: { type: 'lifesteal', value: 20 } };
const actor = sandbox.$gameActors.actor(2);
actor._hp = 500;
actor.mhp = 1000;

const enemy = { isEnemy: () => true };
const action = new sandbox.Game_Action();
action.subject = () => actor;
// Actor deals 1000 damage with 20% lifesteal -> heals 200 HP
sandbox.Game_Action.prototype.executeHpDamage.call(action, enemy, 1000);
assert.strictEqual(actor._hp, 700, 'Lifesteal of 20% on 1000 damage should heal 200 HP (500 -> 700)');

// 6. Testing Save/Load migration
console.log('6. Testing Save/Load migration...');
delete sandbox.$gameSystem._talentData;
sandbox.$gameVariables.setValue(17, 303); // Old save picked talent 303
WebTalent.migrateOldSave();
assert(sandbox.$gameSystem._talentData, 'Migration should create _talentData');
assert.strictEqual(sandbox.$gameSystem._talentData.talentId, 303);
assert.strictEqual(sandbox.$gameSystem._talentData.tier, 3);
assert(sandbox.$gameSystem._talentData.secondary, 'Migration should roll a secondary stat');

// 7. Testing Choice UI and Ticker UI formatting
console.log('7. Testing Choice and Ticker UI...');
sandbox.choiceTest();
assert(sandbox.choices.length === 8, 'Must have 8 choices (1 refresh + 7 talents)');
assert(sandbox.choices[0].includes('Nghịch thiên cải mệnh'), 'First choice must be refresh');
// Each choice must show quality escape tag, name, main bonus, and secondary stat
for (let i = 1; i <= 7; i++) {
  const c = sandbox.choices[i];
  assert(c.includes('\\b['), 'Choice must have quality tag');
  assert(c.includes('TT phụ:'), 'Choice must display secondary stat');
}

// Test TickerManager hook for CE 60
sandbox.TickerManager.show('\\fs[20]\\c[13] thiên phú:\\c[14] cũ\\c[0] mô tả cũ');
assert(sandbox.TickerManager._last.includes('Thiên phú:'), 'Ticker must display upgraded talent info');
assert(sandbox.TickerManager._last.includes(sandbox.$gameSystem._talentData.name), 'Ticker must include talent name');

console.log('ALL TALENT REGRESSION TESTS PASSED!');
