//=============================================================================
/*:
* @plugindesc [v.1.01]
* get.
* @author XiaoRuis
 * @param Start Actor Command
 * @parent ---Window Settings---
 * @type boolean
 * @on Actor Command Window
 * @off Party Command Window
 * @desc Starts turn with the Actor Command Window instead of Party.
 * OFF - false     ON - true
 * @default true
 */
//=============================================================================
function Xiao_sj() {
  $gameTemp.reserveCommonEvent(1);
}
function Xiao_alert() {
  alert("123");
}
function Xiao_msg() {
  TickerManager.show("\\c[14]\\fs[28] 48\\fs[16]Tuổi\\fs[22]：\\c[0]" + $gameVariables.value(1));
}
function Xiao_sj3() {
  $gameTemp.reserveCommonEvent(3);
}
Game_Enemy.prototype.name = function () {
  return this.originalName();
};
function SXhe() {
  $gameVariables.setValue(41 + $gameVariables.value(55), 2);
}
function choiceTest() {
  choices = [];
  params = [];
  $gameMessage.setChoices(choices, 0, 1);
  choices.push("\\fs[18]\\b[4]    Nghịch thiên cải mệnh [Đổi mới tất cả thiên phú]");
  if (typeof $gameTemp !== 'undefined' && $gameTemp && !$gameTemp._talentCandidates) {
    $gameTemp._talentCandidates = [];
  }
  for (var i = 0; i <= 6; i++) {
    var tier = $gameVariables.value(41 + i) || 1;
    var talentId = $gameVariables.value(61 + i);
    if ($gameTemp && !$gameTemp._talentCandidates[i]) {
      $gameTemp._talentCandidates[i] = WebTalent.rollSecondary(tier);
    }
    var candidate = $gameTemp ? $gameTemp._talentCandidates[i] : null;
    var info = WebTalent.getTalentInfo(talentId, tier, candidate);
    var secShort = info.secondary ? info.secondary.text.replace('Thuộc tính phụ: ', 'TT phụ: ') : '';
    var mainTxt = info.mainBonus && info.mainBonus.text ? ' [' + info.mainBonus.text + ']' : '';
    choices.push("   \\fs[13]\\b[" + tier + "]" + info.name + " " + info.mainDesc + mainTxt + " · " + secShort);
    params.push();
  }
  $gameMessage.setChoiceCallback(n => {
    if (n === 0) {
      if ($gameTemp) $gameTemp._talentCandidates = null;
      $gameTemp.reserveCommonEvent(40);
    } else if (n >= 1 && n <= 7) {
      var chosenCandidate = $gameTemp && $gameTemp._talentCandidates ? $gameTemp._talentCandidates[n - 1] : null;
      var chosenId = $gameVariables.value(60 + n);
      var chosenTier = $gameVariables.value(40 + n);
      WebTalent.applyChosenTalent(chosenId, chosenTier, chosenCandidate);
      $gameTemp.reserveCommonEvent(40 + n);
    }
  });
}

//=============================================================================
// NÂNG CẤP HỆ THỐNG THIÊN PHÚ (WebTalent)
//=============================================================================
var WebTalent = {
  formatNumber: function (n) {
    if (typeof n !== 'number') return String(n);
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  getTalentMeta: function (id) {
    if (typeof $dataCommonEvents !== 'undefined' && $dataCommonEvents) {
      for (var q = 52; q <= 55; q++) {
        var list = $dataCommonEvents[q] ? $dataCommonEvents[q].list : [];
        for (var i = 0; i < list.length; i++) {
          var cmd = list[i];
          if (cmd.code === 111 && cmd.parameters && cmd.parameters[3] === id) {
            var name = '', desc = '';
            for (var j = i + 1; j < Math.min(i + 15, list.length); j++) {
              var c2 = list[j];
              if (c2.code === 122) {
                if (c2.parameters[0] === 19 && typeof c2.parameters[4] === 'string') {
                  name = c2.parameters[4].replace(/^['\"]|['\"]$/g, '').trim();
                }
                if (c2.parameters[0] === 20 && typeof c2.parameters[4] === 'string') {
                  desc = c2.parameters[4].replace(/^['\"]|['\"]$/g, '').trim();
                }
              }
            }
            var tier = q - 51;
            var qualityName = q === 52 ? 'Lục' : q === 53 ? 'Lam' : q === 54 ? 'Tử' : 'Hồng';
            return { id: id, tier: tier, qualityName: qualityName, name: name, desc: desc };
          }
        }
      }
    }
    var tierGuess = id >= 400 ? 4 : id >= 300 ? 3 : id >= 200 ? 2 : 1;
    var qGuess = ['Lục', 'Lam', 'Tử', 'Hồng'][tierGuess - 1];
    return { id: id, tier: tierGuess, qualityName: qGuess, name: 'Thiên Phú #' + id, desc: '' };
  },

  getArchetype: function (name, desc) {
    var s = (name + ' ' + desc).toLowerCase();
    if (/huyết|ma huyết|huyết sát|thôn phệ|hút máu|ma đạo|huyết ma/.test(s)) return 'lifesteal';
    if (/thể chất|sinh mệnh|trường sinh|kim cương|ngọc cốt|kim thân|thể trạng|hộ sinh|cường tráng|bền dẻo|sức bền|mình đồng da sắt|khỏe mạnh|sinh long|bất tử|thọ/.test(s)) return 'hp';
    if (/thần lực|kiếm|sát|chiến|võ|man lực|thần uy|đao|quyền|lực tay|lực cánh tay|công kích|rắn rỏi|khổng vũ|lực lớn|uy lực|vũ dũng|dũng khí|cuồng bạo/.test(s)) return 'atk';
    if (/nội lực|khí hải|chân khí|linh lực|hô hấp|chân nguyên|khí công|nội gia|linh căn|đan điền|nhan giá trị|mỹ mạo|lệ chất|thanh tú|hoa nhường|khuynh quốc/.test(s)) return 'mp';
    if (/ngộ tính|thiên tư|học tập|tu luyện|kinh nghiệm|học thức|hiếu học|cốt cách|luyện võ|đọc sách|chính giác|giác ngộ|thông minh|thông tuệ|kỳ tài|uyên bác/.test(s)) return 'exp';
    return 'special';
  },

  getMainBonus: function (tier, archetype) {
    var bonus = { hp: 0, atk: 0, mp: 0, exp: 0, lifesteal: 0, text: '' };
    if (archetype === 'hp') {
      var hpMap = { 1: 3000, 2: 12000, 3: 25000, 4: 40000 };
      bonus.hp = hpMap[tier] || 3000;
      bonus.text = 'HP +' + this.formatNumber(bonus.hp);
    } else if (archetype === 'atk') {
      var atkMap = { 1: 250, 2: 1000, 3: 2500, 4: 6000 };
      bonus.atk = atkMap[tier] || 250;
      bonus.text = 'Công kích +' + this.formatNumber(bonus.atk);
    } else if (archetype === 'mp') {
      var mpMap = { 1: 2500, 2: 10000, 3: 22000, 4: 40000 };
      bonus.mp = mpMap[tier] || 2500;
      bonus.text = 'Nội lực +' + this.formatNumber(bonus.mp);
    } else if (archetype === 'exp') {
      var expMap = { 1: 50, 2: 150, 3: 350, 4: 600 };
      bonus.exp = expMap[tier] || 50;
      bonus.text = 'Kinh nghiệm +' + bonus.exp + '%';
    } else if (archetype === 'lifesteal') {
      var lsMap = { 1: 2, 2: 5, 3: 10, 4: 20 };
      bonus.lifesteal = lsMap[tier] || 2;
      bonus.text = 'Hút máu +' + bonus.lifesteal + '%';
    } else if (archetype === 'special') {
      if (tier === 1) { bonus.hp = 2500; bonus.atk = 150; bonus.text = 'HP +2.500, Công kích +150'; }
      else if (tier === 2) { bonus.hp = 5000; bonus.atk = 300; bonus.text = 'HP +5.000, Công kích +300'; }
      else if (tier === 3) { bonus.hp = 15000; bonus.atk = 1000; bonus.text = 'HP +15.000, Công kích +1.000'; }
      else if (tier === 4) { bonus.hp = 30000; bonus.atk = 3000; bonus.text = 'HP +30.000, Công kích +3.000'; }
    }
    return bonus;
  },

  rollSecondary: function (tier) {
    var types = ['hp', 'atk', 'mp', 'exp', 'lifesteal'];
    var type = types[Math.floor(Math.random() * types.length)];
    var val = 0;
    switch (tier) {
      case 1:
        if (type === 'hp') val = Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000;
        else if (type === 'atk') val = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        else if (type === 'mp') val = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        else if (type === 'exp') val = Math.floor(Math.random() * (100 - 25 + 1)) + 25;
        else if (type === 'lifesteal') val = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        break;
      case 2:
        if (type === 'hp') val = Math.floor(Math.random() * (20000 - 8000 + 1)) + 8000;
        else if (type === 'atk') val = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
        else if (type === 'mp') val = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
        else if (type === 'exp') val = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
        else if (type === 'lifesteal') val = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
        break;
      case 3:
        if (type === 'hp') val = Math.floor(Math.random() * (35000 - 20000 + 1)) + 20000;
        else if (type === 'atk') val = Math.floor(Math.random() * (4000 - 1500 + 1)) + 1500;
        else if (type === 'mp') val = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
        else if (type === 'exp') val = Math.floor(Math.random() * (500 - 250 + 1)) + 250;
        else if (type === 'lifesteal') val = Math.floor(Math.random() * (15 - 7 + 1)) + 7;
        break;
      case 4:
        if (type === 'hp') val = Math.floor(Math.random() * (50000 - 35000 + 1)) + 35000;
        else if (type === 'atk') val = Math.floor(Math.random() * (8000 - 4000 + 1)) + 4000;
        else if (type === 'mp') val = Math.floor(Math.random() * (50000 - 30000 + 1)) + 30000;
        else if (type === 'exp') val = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
        else if (type === 'lifesteal') val = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
        break;
    }
    var text = '';
    if (type === 'hp') text = 'Thuộc tính phụ: HP +' + this.formatNumber(val);
    else if (type === 'atk') text = 'Thuộc tính phụ: Công kích +' + this.formatNumber(val);
    else if (type === 'mp') text = 'Thuộc tính phụ: Nội lực +' + this.formatNumber(val);
    else if (type === 'exp') text = 'Thuộc tính phụ: Kinh nghiệm +' + this.formatNumber(val) + '%';
    else if (type === 'lifesteal') text = 'Thuộc tính phụ: Hút máu +' + val + '%';
    return { type: type, value: val, text: text };
  },

  getTalentInfo: function (id, tier, secondary) {
    var meta = this.getTalentMeta(id);
    var t = tier || (meta ? meta.tier : 1);
    var name = meta ? meta.name : ('Thiên Phú #' + id);
    var desc = meta ? meta.desc : '';
    var arc = this.getArchetype(name, desc);
    var mainBonus = this.getMainBonus(t, arc);
    var sec = secondary || this.rollSecondary(t);
    return {
      id: id,
      tier: t,
      qualityName: meta ? meta.qualityName : ['Lục', 'Lam', 'Tử', 'Hồng'][t - 1],
      name: name,
      mainDesc: desc,
      mainBonus: mainBonus,
      secondary: sec
    };
  },

  applyChosenTalent: function (id, tier, candidateSecondary) {
    var info = this.getTalentInfo(id, tier, candidateSecondary);
    if (typeof $gameSystem !== 'undefined' && $gameSystem) {
      $gameSystem._talentData = {
        talentId: id,
        tier: info.tier,
        qualityName: info.qualityName,
        name: info.name,
        mainDesc: info.mainDesc,
        mainBonus: info.mainBonus,
        secondary: info.secondary
      };
    }
    if (typeof $gameVariables !== 'undefined' && $gameVariables) {
      $gameVariables.setValue(17, id);
      $gameVariables.setValue(19, info.name);
      var fullDesc = info.mainDesc + (info.mainBonus && info.mainBonus.text ? ' [' + info.mainBonus.text + ']' : '') + '\n' + info.secondary.text;
      $gameVariables.setValue(20, fullDesc);
    }
    if (typeof $gameActors !== 'undefined' && $gameActors && $gameActors.actor(2)) {
      $gameActors.actor(2).refresh();
      $gameActors.actor(2).gainHp($gameActors.actor(2).mhp);
      $gameActors.actor(2).gainMp($gameActors.actor(2).mmp);
    }
  },

  getActiveStats: function () {
    var td = typeof $gameSystem !== 'undefined' && $gameSystem ? $gameSystem._talentData : null;
    if (!td) return { hp: 0, atk: 0, mp: 0, exp: 0, lifesteal: 0 };
    var mb = td.mainBonus || {};
    var sec = td.secondary || {};
    return {
      hp: (mb.hp || 0) + (sec.type === 'hp' ? sec.value : 0),
      atk: (mb.atk || 0) + (sec.type === 'atk' ? sec.value : 0),
      mp: (mb.mp || 0) + (sec.type === 'mp' ? sec.value : 0),
      exp: (mb.exp || 0) + (sec.type === 'exp' ? sec.value : 0),
      lifesteal: (mb.lifesteal || 0) + (sec.type === 'lifesteal' ? sec.value : 0)
    };
  },

  calculateExp: function (baseExp) {
    if (!baseExp || baseExp <= 0) return 0;
    var bonusRate = this.getActiveStats().exp;
    return Math.round(baseExp * (1 + bonusRate / 100));
  },

  migrateOldSave: function () {
    if (typeof $gameSystem === 'undefined' || !$gameSystem) return;
    if (!$gameSystem._talentData && typeof $gameVariables !== 'undefined' && $gameVariables) {
      var id = $gameVariables.value(17);
      if (id > 0) {
        var meta = this.getTalentMeta(id);
        var tier = meta ? meta.tier : (id >= 400 ? 4 : id >= 300 ? 3 : id >= 200 ? 2 : 1);
        this.applyChosenTalent(id, tier, null);
      }
    }
  },

  getTalentStatusText: function () {
    var td = typeof $gameSystem !== 'undefined' && $gameSystem ? $gameSystem._talentData : null;
    if (!td) return 'Chưa kích hoạt Thiên Phú';
    var mainStr = td.mainDesc + (td.mainBonus && td.mainBonus.text ? ' [' + td.mainBonus.text + ']' : '');
    return td.name + '\n' + mainStr + '\n' + (td.secondary ? td.secondary.text : '');
  }
};

//=============================================================================
// RPG MAKER MV HOOKS (Stats, EXP, Lifesteal, Save/Load)
//=============================================================================
var _Xiao_SJ_Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function (paramId) {
  var val = _Xiao_SJ_Game_Actor_paramPlus.call(this, paramId);
  if (this.actorId() === 2) {
    var st = WebTalent.getActiveStats();
    if (paramId === 0) val += st.hp;
    else if (paramId === 1) val += st.mp;
    else if (paramId === 2) val += st.atk;
  }
  return val;
};

var _Xiao_SJ_Game_Actor_paramMax = Game_Actor.prototype.paramMax;
Game_Actor.prototype.paramMax = function (paramId) {
  var val = _Xiao_SJ_Game_Actor_paramMax.call(this, paramId);
  if (this.actorId() === 2) {
    var st = WebTalent.getActiveStats();
    if (paramId === 0) val += st.hp;
    else if (paramId === 1) val += st.mp;
    else if (paramId === 2) val += st.atk;
  }
  return val;
};

var _Xiao_SJ_Game_Interpreter_command315 = Game_Interpreter.prototype.command315;
Game_Interpreter.prototype.command315 = function () {
  var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
  this.iterateActorEx(this._params[0], this._params[1], function (actor) {
    var finalVal = value;
    if (value > 0 && actor.actorId() === 2) {
      finalVal = WebTalent.calculateExp(value);
    }
    actor.changeExp(actor.currentExp() + finalVal, this._params[5]);
  }.bind(this));
  return true;
};

var _Xiao_SJ_Game_Actor_finalExpRate = Game_Actor.prototype.finalExpRate;
Game_Actor.prototype.finalExpRate = function () {
  if (this.actorId() === 2) {
    return this.isBattleMember() ? 1 : this.benchMembersExpRate();
  }
  return _Xiao_SJ_Game_Actor_finalExpRate.call(this);
};

var _Xiao_SJ_Game_Actor_gainExp = Game_Actor.prototype.gainExp;
Game_Actor.prototype.gainExp = function (exp) {
  if (this.actorId() === 2 && exp > 0) {
    var finalExp = WebTalent.calculateExp(exp);
    var rate = this.isBattleMember() ? 1 : this.benchMembersExpRate();
    var newExp = this.currentExp() + Math.round(finalExp * rate);
    this.changeExp(newExp, this.shouldDisplayLevelUp());
  } else {
    _Xiao_SJ_Game_Actor_gainExp.call(this, exp);
  }
};

var _Xiao_SJ_Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function (target, value) {
  _Xiao_SJ_Game_Action_executeHpDamage.call(this, target, value);
  if (value > 0 && this.subject() && this.subject().isActor() && this.subject().actorId() === 2 && target && target.isEnemy()) {
    var ls = WebTalent.getActiveStats().lifesteal;
    if (ls > 0) {
      var heal = Math.floor(value * ls / 100);
      if (heal > 0) {
        this.subject().gainHp(heal);
      }
    }
  }
};

var _Xiao_SJ_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
  if (_Xiao_SJ_DataManager_extractSaveContents) {
    _Xiao_SJ_DataManager_extractSaveContents.call(this, contents);
  }
  WebTalent.migrateOldSave();
};

if (typeof TickerManager !== 'undefined' && TickerManager.show) {
  var _Xiao_SJ_TickerManager_show = TickerManager.show;
  TickerManager.show = function (text, needPlus) {
    if (typeof text === 'string' && (text.indexOf('thiên phú:') !== -1 || text.indexOf('thiên phú') !== -1) && typeof $gameSystem !== 'undefined' && $gameSystem && $gameSystem._talentData) {
      var td = $gameSystem._talentData;
      var mainTxt = td.mainBonus && td.mainBonus.text ? ' [' + td.mainBonus.text + ']' : '';
      var secTxt = td.secondary && td.secondary.text ? ' · ' + td.secondary.text : '';
      text = '\\fs[18]\\c[13]Thiên phú:\\c[14] ' + td.name + '\\c[0] ' + td.mainDesc + mainTxt + secTxt;
    }
    return _Xiao_SJ_TickerManager_show.call(this, text, needPlus);
  };
}


// Căn chỉnh ảnh nền tĩnh Thiên Phú ($MGT_Talent) đúng vùng màn hình game 540x960
var _Xiao_SJ_Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
Spriteset_Map.prototype.updateParallax = function () {
  _Xiao_SJ_Spriteset_Map_updateParallax.call(this);
  if (this._parallax && this._parallax.bitmap) {
    if (this._parallaxName === "$MGT_Talent") {
      var pw = this._parallax.bitmap.width;
      var ph = this._parallax.bitmap.height;
      if (pw > 0 && ph > 0) {
        if (this._parallax.tileScale) {
          this._parallax.tileScale.x = Graphics.width / pw;
          this._parallax.tileScale.y = Graphics.height / ph;
        }
        this._parallax.origin.x = 0;
        this._parallax.origin.y = 0;
      }
    } else if (this._parallax.tileScale && (this._parallax.tileScale.x !== 1 || this._parallax.tileScale.y !== 1)) {
      this._parallax.tileScale.x = 1;
      this._parallax.tileScale.y = 1;
    }
  }
};

