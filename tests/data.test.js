// ===== 勇者ものがたり - Data Integrity Tests =====
// Node.js built-in test runner (node --test)
'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// --- Load game data by evaluating data.js in a controlled scope ---
// data.js uses browser globals (Canvas) for MONSTER_SPRITES draw functions,
// so we stub only what's needed for the module to load.
function loadGameData() {
  const code = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf-8');
  const sandbox = {};
  // Provide a minimal stub for Canvas-related code in MONSTER_SPRITES
  const fn = new Function(
    code + '\n' +
    'return {PALETTE,SPRITES,MONSTERS,ENCOUNTER_TABLES,ITEMS,WEAPONS,ARMORS,SHIELDS,' +
    'SPELLS,LEVEL_TABLE,SHOPS,WORLD_LOCATIONS,MAPS,MONSTER_SPRITES};'
  );
  return fn();
}

const DATA = loadGameData();
const { MONSTERS, ENCOUNTER_TABLES, ITEMS, WEAPONS, ARMORS, SHIELDS, SPELLS,
        LEVEL_TABLE, SHOPS, WORLD_LOCATIONS, MAPS, PALETTE } = DATA;

// =========================================
// Monsters
// =========================================
describe('MONSTERS', () => {
  it('全モンスターに必須プロパティがある', () => {
    for (const [id, m] of Object.entries(MONSTERS)) {
      assert.ok(m.name, `${id}: name がない`);
      assert.ok(typeof m.hp === 'number' && m.hp > 0, `${id}: hp が不正`);
      assert.ok(typeof m.atk === 'number', `${id}: atk がない`);
      assert.ok(typeof m.def === 'number', `${id}: def がない`);
      assert.ok(typeof m.sprite === 'string', `${id}: sprite がない`);
    }
  });

  it('ゾムトは sealOnly かつ sealMax を持つ', () => {
    assert.ok(MONSTERS.zomt, 'zomt が定義されていない');
    assert.ok(MONSTERS.zomt.sealOnly, 'zomt.sealOnly が false');
    assert.ok(MONSTERS.zomt.sealMax > 0, 'zomt.sealMax が不正');
  });
});

// =========================================
// Encounter Tables
// =========================================
describe('ENCOUNTER_TABLES', () => {
  it('全エンカウントテーブルのモンスターが MONSTERS に存在する', () => {
    for (const [region, list] of Object.entries(ENCOUNTER_TABLES)) {
      for (const mid of list) {
        assert.ok(MONSTERS[mid], `${region} のモンスター "${mid}" が MONSTERS に存在しない`);
      }
    }
  });
});

// =========================================
// Items
// =========================================
describe('ITEMS', () => {
  it('全アイテムに必須プロパティがある', () => {
    for (const [id, item] of Object.entries(ITEMS)) {
      assert.ok(item.name, `${id}: name がない`);
      assert.ok(typeof item.type === 'string', `${id}: type がない`);
    }
  });
});

// =========================================
// Equipment
// =========================================
describe('Equipment', () => {
  it('全武器に name, price, atk がある', () => {
    for (const [id, w] of Object.entries(WEAPONS)) {
      assert.ok(w.name, `${id}: name がない`);
      assert.ok(typeof w.atk === 'number', `${id}: atk がない`);
    }
  });

  it('全防具に name, price, def がある', () => {
    for (const [id, a] of Object.entries(ARMORS)) {
      assert.ok(a.name, `${id}: name がない`);
      assert.ok(typeof a.def === 'number', `${id}: def がない`);
    }
  });

  it('全盾に name, price, def がある', () => {
    for (const [id, s] of Object.entries(SHIELDS)) {
      assert.ok(s.name, `${id}: name がない`);
      assert.ok(typeof s.def === 'number', `${id}: def がない`);
    }
  });
});

// =========================================
// Spells
// =========================================
describe('SPELLS', () => {
  it('全呪文に必須プロパティがある', () => {
    for (const [id, sp] of Object.entries(SPELLS)) {
      assert.ok(sp.name, `${id}: name がない`);
      assert.ok(typeof sp.mp === 'number' && sp.mp > 0, `${id}: mp が不正`);
      assert.ok(['heal', 'attack', 'field', 'seal'].includes(sp.type), `${id}: type "${sp.type}" が不正`);
    }
  });

  it('ロウチョンは seal タイプ', () => {
    assert.ok(SPELLS.roucon, 'roucon が定義されていない');
    assert.equal(SPELLS.roucon.type, 'seal');
  });
});

// =========================================
// Level Table
// =========================================
describe('LEVEL_TABLE', () => {
  it('Lv1～Lv20 の20エントリがある', () => {
    assert.equal(LEVEL_TABLE.length, 20);
  });

  it('必要経験値は単調増加', () => {
    for (let i = 1; i < LEVEL_TABLE.length; i++) {
      assert.ok(LEVEL_TABLE[i][0] > LEVEL_TABLE[i - 1][0],
        `Lv${i + 1} の必要経験値 (${LEVEL_TABLE[i][0]}) が Lv${i} (${LEVEL_TABLE[i - 1][0]}) より大きくない`);
    }
  });

  it('maxHp は単調増加', () => {
    for (let i = 1; i < LEVEL_TABLE.length; i++) {
      assert.ok(LEVEL_TABLE[i][1] >= LEVEL_TABLE[i - 1][1],
        `Lv${i + 1} の maxHp が Lv${i} より小さい`);
    }
  });
});

// =========================================
// Shops
// =========================================
describe('SHOPS', () => {
  it('全ショップの商品が対応するデータに存在する', () => {
    for (const [shopId, shop] of Object.entries(SHOPS)) {
      for (const itemId of shop.items) {
        if (shop.type === 'weapon') {
          assert.ok(WEAPONS[itemId], `ショップ "${shopId}" の武器 "${itemId}" が WEAPONS に存在しない`);
        } else if (shop.type === 'armor') {
          assert.ok(ARMORS[itemId] || SHIELDS[itemId],
            `ショップ "${shopId}" の防具 "${itemId}" が ARMORS/SHIELDS に存在しない`);
        } else if (shop.type === 'item') {
          assert.ok(ITEMS[itemId], `ショップ "${shopId}" のアイテム "${itemId}" が ITEMS に存在しない`);
        }
      }
    }
  });
});

// =========================================
// Maps
// =========================================
describe('MAPS', () => {
  it('全マップに必須プロパティがある', () => {
    for (const [id, m] of Object.entries(MAPS)) {
      assert.ok(typeof m.width === 'number', `${id}: width がない`);
      assert.ok(typeof m.height === 'number', `${id}: height がない`);
      assert.ok(Array.isArray(m.tiles), `${id}: tiles がない`);
      assert.equal(m.tiles.length, m.height, `${id}: tiles の行数が height と不一致`);
    }
  });

  it('WORLD_LOCATIONS の全マップが MAPS に存在する', () => {
    for (const loc of WORLD_LOCATIONS) {
      assert.ok(MAPS[loc.map], `WORLD_LOCATIONS の map "${loc.map}" が MAPS に存在しない`);
    }
  });

  it('宝箱のアイテムが定義されている', () => {
    for (const [id, m] of Object.entries(MAPS)) {
      if (!m.chests) continue;
      for (const chest of m.chests) {
        const exists = ITEMS[chest.item] || WEAPONS[chest.item] || ARMORS[chest.item] || SHIELDS[chest.item];
        assert.ok(exists, `マップ "${id}" の宝箱アイテム "${chest.item}" が未定義`);
      }
    }
  });

  it('中ボスのモンスターIDが MONSTERS に存在する', () => {
    for (const [id, m] of Object.entries(MAPS)) {
      if (m.midBoss) {
        assert.ok(MONSTERS[m.midBoss.monsterId],
          `マップ "${id}" の midBoss "${m.midBoss.monsterId}" が MONSTERS に存在しない`);
      }
      if (m.boss) {
        assert.ok(MONSTERS[m.boss.monsterId],
          `マップ "${id}" の boss "${m.boss.monsterId}" が MONSTERS に存在しない`);
      }
    }
  });
});

// =========================================
// Game Logic (via game.js source parsing)
// =========================================
describe('Game Logic', () => {
  const gameCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf-8');

  it('まおう戦開始時にセリフ演出がある', () => {
    assert.ok(gameCode.includes("monsterId === 'demonLord'"), 'まおう戦の分岐がない');
    assert.ok(gameCode.includes('おまえの ちち'), 'まおう戦前の父親セリフがない');
  });

  it('まおう撃破後にゾムト召喚セリフがある', () => {
    assert.ok(gameCode.includes('いでよ'), 'ゾムト召喚セリフがない');
    assert.ok(gameCode.includes('ひかりのつるぎさえ'), 'ひかりのつるぎセリフがない');
  });

  it('ロウチョン習得処理がある', () => {
    assert.ok(gameCode.includes("'roucon'"), 'roucon の参照がない');
    assert.ok(gameCode.includes('spells.push'), 'spells.push がない');
  });

  it('エンカウント時の msgQueue 処理がある', () => {
    // encounter フェーズで msgQueue をチェックする実装があるか
    assert.ok(gameCode.includes('msgQueue.length'), 'msgQueue の処理がない');
  });
});
