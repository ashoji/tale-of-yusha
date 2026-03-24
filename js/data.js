// ===== 勇者ものがたり - Game Data =====
'use strict';

const PALETTE = [
  null,        // 0 transparent
  '#000000',   // 1 black
  '#FFFFFF',   // 2 white
  '#CC3333',   // 3 red
  '#33AA33',   // 4 green
  '#3355CC',   // 5 blue
  '#DDDD33',   // 6 yellow
  '#DD8833',   // 7 orange
  '#885522',   // 8 brown
  '#999999',   // 9 gray
  '#6699CC',   // A light blue
  '#CC66AA',   // B magenta
  '#226622',   // C dark green
  '#222266',   // D dark blue
  '#FFCC99',   // E skin
  '#553311',   // F dark brown
];

// --- Sprite pixel data (16x16 hex strings) ---
const SPRITES = {
  hero: [
    '0000077770000000',
    '0007777777700000',
    '0077777777770000',
    '007EE77777EE0000',
    '00EEEEEEEEE00000',
    '00EE1EEE1EE00000',
    '000EEEEEEE000000',
    '0000EBBEE0000000',
    '000AAAAAAA000000',
    '00AAAAAAAAA00000',
    '00AA2AAA2AA00000',
    '00AAAAAAAAA00000',
    '000AAA0AAA000000',
    '000EEE0EEE000000',
    '0008800088000000',
    '0000000000000000',
  ],
  // World map tiles
  grass: [
    '4444444444444444','44C4444444444C44','4444444444444444','4444C44444C44444',
    '4444444444444444','44444444C4444444','4444444444444444','C444444444444444',
    '4444C44444444444','4444444444C44444','4444444C44444444','44C4444444444C44',
    '4444444444444444','4C44444444444444','4444444C44444444','4444444444444444',
  ],
  water: [
    '5555555555555555','5555AAAA55555555','55555555555AAA55','5555555555555555',
    'AAA5555555555555','5555555555555555','5555555AAA555555','5555555555555555',
    '5555555555555555','555AAA5555555555','5555555555AAA555','5555555555555555',
    '5555555555555555','5AAA555555555555','5555555555555555','55555555AAA55555',
  ],
  mountain: [
    '4444444994444444','4444449999444444','4444499999944444','4444999929994444',
    '4449999999994444','4499999999999444','4999999999999944','9999999999999994',
    '8888888888888884','8888888888888884','4444444444444444','4444444444444444',
    '4444444444444444','4444444444444444','4444444444444444','4444444444444444',
  ],
  forest: [
    '44444CCC44444444','4444CCCCC4444444','444CCCCCCC444444','44CCCCCCCCC44444',
    '4CCCCCCCCCCC4444','44444CC444444444','4444CCCC44444444','444CCCCCC4444444',
    '44CCCCCCCC444444','4CCCCCCCCCC44444','CCCCCCCCCCCCC444','44444FF444444444',
    '44444FF444444444','44444FF444444444','44444FF444444444','4444444444444444',
  ],
  town: [
    '4444433334444444','4444333333444444','4443333333344444','4433322233344444',
    '4433322233344444','4433377333344444','4433370033344444','4444470044444444',
    '4447770077744444','4477222227744444','4477222227744444','4477733777744444',
    '4477700077744444','4444400044444444','4444444444444444','4444444444444444',
  ],
  cave: [
    '4444999994444444','4449111119444444','4491111111944444','4911111111194444',
    '9111111111119444','9111111111119444','9111111111119444','4911111111194444',
    '4499111119944444','4444999994444444','4444444444444444','4444444444444444',
    '4444444444444444','4444444444444444','4444444444444444','4444444444444444',
  ],
  castle: [
    '4490904090904444','4499999999994444','4499922299994444','4499922299994444',
    '4499922299994444','4499933399994444','4499900099994444','4499900099994444',
    '4499999999994444','4499999999994444','4444444444444444','4444444444444444',
    '4444444444444444','4444444444444444','4444444444444444','4444444444444444',
  ],
  bridge: [
    '8888888888888885','8FF88FF88FF88885','8888888888888885','F8F8F8F8F8F8F885',
    '8888888888888885','8FF88FF88FF88885','8888888888888885','F8F8F8F8F8F8F885',
    '8888888888888885','8FF88FF88FF88885','8888888888888885','F8F8F8F8F8F8F885',
    '8888888888888885','8FF88FF88FF88885','8888888888888885','5555555555555555',
  ],
  desert: [
    '6666766676667666','6767666666766676','6666666766666666','6676666666676666',
    '6666676666666676','6666666676666666','6766666666766666','6666766666666666',
    '6666666666676666','6676666766666666','6666666666666666','6666676666676666',
    '6766666666666676','6666666766666666','6666666666766666','6676666666666666',
  ],
  swamp: [
    'C444C44C44C444C4','44C4444444C44444','4444B444444B4444','C4444444C4444444',
    '4444C44444444C44','44B44444B4444444','4444444444444444','C4444C44444C4444',
    '44444444C4444444','4444B44444444B44','44C44444444C4444','4444444C44444444',
    'C444444444C44444','44444B444444B444','4444444444444444','44C4444C444C4444',
  ],
  // Indoor tiles
  floor: [
    'FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF',
    '8888888888888888','FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF',
    'FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF','8888888888888888','FFFFF8FFFFF8FFFF',
    'FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF','FFFFF8FFFFF8FFFF',
  ],
  wall: [
    '9999999999999999','9919999999919999','9999999999999999','9999999999999999',
    '1111111111111111','9999991999999999','9999999999999999','9999999999999999',
    '9999999999999999','1111111111111111','9999999919999999','9999999999999999',
    '9999999999999999','9999999999999999','1111111111111111','9999999999999999',
  ],
  door: [
    '8888888888888888','8888888888888888','8877777777778888','8877777777778888',
    '8877777777778888','8877777777778888','8877777777778888','8877777877778888',
    '8877777777778888','8877777777778888','8877777777778888','8877777777778888',
    '8877777777778888','8877777777778888','8877777777778888','FFFFFFFFFFFFFFFF',
  ],
  counter: [
    '8888888888888888','8777777777777788','8777777777777788','8888888888888888',
    '8F00F00F00F00F88','8F00F00F00F00F88','8888888888888888','FFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFF','FFFFFFFFFFFFFFFF','FFFFFFFFFFFFFFFF','FFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFF','FFFFFFFFFFFFFFFF','FFFFFFFFFFFFFFFF','FFFFFFFFFFFFFFFF',
  ],
  stairs: [
    '1111111111111111','1199999999999911','1199999999999911','1111999999991111',
    '1111999999991111','1111119999111111','1111119999111111','1111111991111111',
    '1111111991111111','1111111111111111','1111111111111111','1111111111111111',
    '1111111111111111','1111111111111111','1111111111111111','1111111111111111',
  ],
  chest: [
    '0000000000000000','0000000000000000','0000000000000000','0008888888800000',
    '0087777777800000','0087766778800000','0087766778800000','0087777778800000',
    '0088883888800000','0087777778800000','0087777778800000','0088888888800000',
    '0000000000000000','0000000000000000','0000000000000000','0000000000000000',
  ],
  bed: [
    '0022222222200000','0023333333200000','0023333333200000','0022222222200000',
    '0022222222200000','002EEEEEEE200000','002EEEEEEE200000','002EEEEEEE200000',
    '002EEEEEEE200000','002EEEEEEE200000','002EEEEEEE200000','002EEEEEEE200000',
    '002EEEEEEE200000','0022222222200000','0088000008800000','0088000008800000',
  ],
  chestOpen: [
    '0000000000000000','0008888888800000','0086666666800000','0086888868800000',
    '0088888888800000','0008888888800000','0087777778800000','0087777778800000',
    '0087777778800000','0088888888800000','0087777778800000','0088888888800000',
    '0000000000000000','0000000000000000','0000000000000000','0000000000000000',
  ],
  // NPC sprites (16x16)
  npc_king: [
    '0000066660000000','0006666666000000','0066666666600000','006E611116E00000',
    '00EEEEEEEEE00000','00EE1EEE1EE00000','000EEEEEEE000000','0000EBBEE0000000',
    '0003333333000000','0033333333300000','0033233323300000','0033333333300000',
    '0003330333000000','000EEE0EEE000000','0006600066000000','0000000000000000',
  ],
  npc_woman: [
    '0000011110000000','0001111111000000','0011111111100000','001EE111EE100000',
    '00EEEEEEEEE00000','00EE1EEE1EE00000','000EEEEEEE000000','0000EBBEE0000000',
    '0003333333000000','0033333333300000','0033333333300000','0033333333300000',
    '0003330333000000','000EEE0EEE000000','0003300033000000','0000000000000000',
  ],
  npc_oldman: [
    '0000099990000000','0009999999000000','0099999999900000','009EE999EE900000',
    '00EEEEEEEEE00000','00EE1EEE1EE00000','000EEEEEEE000000','000EEEEEE0000000',
    '0005555555000000','0055555555500000','0055525552500000','0055555555500000',
    '0005550555000000','000EEE0EEE000000','0008800088000000','0000000000000000',
  ],
  npc_merchant: [
    '0000088880000000','0008888888000000','0088888888800000','008EE888EE800000',
    '00EEEEEEEEE00000','00EE1EEE1EE00000','000EEEEEEE000000','0000EBBEE0000000',
    '0007777777000000','0077777777700000','0077727772700000','0077777777700000',
    '0007770777000000','000EEE0EEE000000','0008800088000000','0000000000000000',
  ],
  npc_soldier: [
    '0000099990000000','0009999999000000','0099999999900000','009EE999EE900000',
    '00EEEEEEEEE00000','00EE1EEE1EE00000','000EEEEEEE000000','0000EEEEE0000000',
    '000AAAAAAA000000','00AAAAAAAA000000','00AA2AAA2AA00000','00AAAAAAAAA00000',
    '000AAA0AAA000000','000EEE0EEE000000','0009900099000000','0000000000000000',
  ],
};

// --- Monster sprites (battle screen, 32x32) ---
const MONSTER_SPRITES = {
  puyopuyo: { w:32, h:32, colors: ['#33CC33','#228822','#FFFFFF','#111111'], draw(ctx,x,y,w,h) {
    ctx.fillStyle='#33CC33'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.6,w*0.4,h*0.4,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#228822'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.65,w*0.35,h*0.25,0,0,Math.PI); ctx.fill();
    ctx.fillStyle='#FFFFFF'; ctx.beginPath(); ctx.ellipse(x+w*0.35,y+h*0.45,6,7,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+w*0.65,y+h*0.45,6,7,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111111'; ctx.beginPath(); ctx.ellipse(x+w*0.37,y+h*0.47,3,4,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+w*0.63,y+h*0.47,3,4,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#CC3333'; ctx.beginPath(); ctx.ellipse(x+w*0.5,y+h*0.6,4,2,0,0,Math.PI*2); ctx.fill();
  }},
  bat: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#442266';
    ctx.beginPath(); ctx.moveTo(x+w*0.5,y+h*0.3); ctx.lineTo(x,y+h*0.2); ctx.lineTo(x+w*0.15,y+h*0.6);
    ctx.lineTo(x+w*0.3,y+h*0.4); ctx.lineTo(x+w*0.5,y+h*0.7); ctx.lineTo(x+w*0.7,y+h*0.4);
    ctx.lineTo(x+w*0.85,y+h*0.6); ctx.lineTo(x+w,y+h*0.2); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#FF0000'; ctx.beginPath(); ctx.arc(x+w*0.4,y+h*0.35,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.6,y+h*0.35,2,0,Math.PI*2); ctx.fill();
  }},
  goblin: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#558833'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.35,w*0.25,h*0.25,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#558833'; ctx.fillRect(x+w*0.3,y+h*0.55,w*0.4,h*0.35);
    ctx.fillStyle='#FFCC99'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.3,w*0.2,h*0.2,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(x+w*0.4,y+h*0.27,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.6,y+h*0.27,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#553311'; ctx.fillRect(x+w*0.7,y+h*0.35,w*0.25,h*0.06);
    ctx.fillStyle='#558833'; ctx.beginPath(); ctx.moveTo(x+w*0.25,y+h*0.25); ctx.lineTo(x+w*0.15,y+h*0.1);
    ctx.lineTo(x+w*0.35,y+h*0.2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.75,y+h*0.25); ctx.lineTo(x+w*0.85,y+h*0.1);
    ctx.lineTo(x+w*0.65,y+h*0.2); ctx.fill();
  }},
  skeleton: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#EEEECC'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.2,w*0.18,h*0.15,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(x+w*0.42,y+h*0.18,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.58,y+h*0.18,3,0,Math.PI*2); ctx.fill();
    ctx.fillRect(x+w*0.44,y+h*0.25,w*0.12,h*0.03);
    ctx.fillStyle='#EEEECC'; ctx.fillRect(x+w*0.46,y+h*0.33,w*0.08,h*0.15);
    for(let i=0;i<3;i++) ctx.fillRect(x+w*0.35,y+h*(0.38+i*0.05),w*0.3,h*0.02);
    ctx.fillRect(x+w*0.38,y+h*0.52,w*0.05,h*0.25); ctx.fillRect(x+w*0.57,y+h*0.52,w*0.05,h*0.25);
    ctx.fillRect(x+w*0.42,y+h*0.36,w*0.03,h*0.12); ctx.fillRect(x+w*0.55,y+h*0.36,w*0.03,h*0.12);
    ctx.fillStyle='#999'; ctx.fillRect(x+w*0.7,y+h*0.15,w*0.05,h*0.5);
    ctx.fillStyle='#AAA'; ctx.fillRect(x+w*0.65,y+h*0.1,w*0.15,h*0.06);
  }},
  sorcerer: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#6622AA'; ctx.beginPath(); ctx.moveTo(x+w*0.5,y); ctx.lineTo(x+w*0.3,y+h*0.25);
    ctx.lineTo(x+w*0.7,y+h*0.25); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#FFCC99'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.3,w*0.15,h*0.1,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(x+w*0.45,y+h*0.28,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.55,y+h*0.28,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#6622AA'; ctx.beginPath(); ctx.moveTo(x+w*0.3,y+h*0.35); ctx.lineTo(x+w*0.2,y+h*0.85);
    ctx.lineTo(x+w*0.8,y+h*0.85); ctx.lineTo(x+w*0.7,y+h*0.35); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#FFDD00'; ctx.beginPath(); ctx.arc(x+w*0.15,y+h*0.55,4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#885500'; ctx.fillRect(x+w*0.13,y+h*0.55,w*0.04,h*0.35);
  }},
  gargoyle: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#666677';
    ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.35,w*0.2,h*0.2,0,0,Math.PI*2); ctx.fill();
    ctx.fillRect(x+w*0.35,y+h*0.5,w*0.3,h*0.35);
    ctx.beginPath(); ctx.moveTo(x+w*0.5,y+h*0.3); ctx.lineTo(x+w*0.1,y+h*0.55);
    ctx.lineTo(x+w*0.25,y+h*0.5); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.5,y+h*0.3); ctx.lineTo(x+w*0.9,y+h*0.55);
    ctx.lineTo(x+w*0.75,y+h*0.5); ctx.fill();
    ctx.fillStyle='#FF0000'; ctx.beginPath(); ctx.arc(x+w*0.4,y+h*0.3,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.6,y+h*0.3,3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#555566'; ctx.beginPath(); ctx.moveTo(x+w*0.4,y+h*0.2);
    ctx.lineTo(x+w*0.3,y+h*0.1); ctx.lineTo(x+w*0.45,y+h*0.2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.6,y+h*0.2);
    ctx.lineTo(x+w*0.7,y+h*0.1); ctx.lineTo(x+w*0.55,y+h*0.2); ctx.fill();
  }},
  golem: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#887766';
    ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.25,w*0.22,h*0.18,0,0,Math.PI*2); ctx.fill();
    ctx.fillRect(x+w*0.25,y+h*0.4,w*0.5,h*0.45);
    ctx.fillRect(x+w*0.1,y+h*0.42,w*0.18,h*0.3);
    ctx.fillRect(x+w*0.72,y+h*0.42,w*0.18,h*0.3);
    ctx.fillRect(x+w*0.3,y+h*0.82,w*0.15,h*0.15);
    ctx.fillRect(x+w*0.55,y+h*0.82,w*0.15,h*0.15);
    ctx.fillStyle='#FFCC00'; ctx.beginPath(); ctx.arc(x+w*0.4,y+h*0.22,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.6,y+h*0.22,3,0,Math.PI*2); ctx.fill();
  }},
  darkKnight: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#222233';
    ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.18,w*0.18,h*0.14,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.35,y+h*0.08); ctx.lineTo(x+w*0.3,y+h*0.04);
    ctx.lineTo(x+w*0.4,y+h*0.1); ctx.fill();
    ctx.fillStyle='#FF0000'; ctx.beginPath(); ctx.arc(x+w*0.44,y+h*0.16,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.56,y+h*0.16,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#222233'; ctx.fillRect(x+w*0.3,y+h*0.3,w*0.4,h*0.45);
    ctx.fillStyle='#333344'; ctx.fillRect(x+w*0.33,y+h*0.32,w*0.34,h*0.1);
    ctx.fillStyle='#222233';
    ctx.fillRect(x+w*0.3,y+h*0.72,w*0.15,h*0.2);
    ctx.fillRect(x+w*0.55,y+h*0.72,w*0.15,h*0.2);
    ctx.fillStyle='#888899'; ctx.fillRect(x+w*0.75,y+h*0.2,w*0.04,h*0.55);
    ctx.fillRect(x+w*0.68,y+h*0.18,w*0.18,h*0.04);
    ctx.fillStyle='#222233'; ctx.beginPath();
    ctx.ellipse(x+w*0.18,y+h*0.5,w*0.12,h*0.15,0,0,Math.PI*2); ctx.fill();
  }},
  demonLord: { w:32, h:32, draw(ctx,x,y,w,h) {
    ctx.fillStyle='#440044';
    ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.3,w*0.25,h*0.2,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#550055';
    ctx.beginPath(); ctx.moveTo(x+w*0.3,y+h*0.35); ctx.lineTo(x+w*0.15,y+h*0.8);
    ctx.lineTo(x+w*0.85,y+h*0.8); ctx.lineTo(x+w*0.7,y+h*0.35); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#440044';
    ctx.beginPath(); ctx.moveTo(x+w*0.3,y+h*0.2); ctx.lineTo(x+w*0.15,y);
    ctx.lineTo(x+w*0.35,y+h*0.15); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.7,y+h*0.2); ctx.lineTo(x+w*0.85,y);
    ctx.lineTo(x+w*0.65,y+h*0.15); ctx.fill();
    ctx.fillStyle='#FF0000'; ctx.beginPath(); ctx.arc(x+w*0.4,y+h*0.25,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w*0.6,y+h*0.25,4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#FFFFFF';
    ctx.beginPath(); ctx.moveTo(x+w*0.4,y+h*0.38); ctx.lineTo(x+w*0.45,y+h*0.42);
    ctx.lineTo(x+w*0.38,y+h*0.42); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.55,y+h*0.38); ctx.lineTo(x+w*0.6,y+h*0.42);
    ctx.lineTo(x+w*0.53,y+h*0.42); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.5,y+h*0.38); ctx.lineTo(x+w*0.53,y+h*0.42);
    ctx.lineTo(x+w*0.47,y+h*0.42); ctx.fill();
    ctx.fillStyle='#330033';
    ctx.beginPath(); ctx.moveTo(x+w*0.05,y+h*0.4); ctx.lineTo(x+w*0.3,y+h*0.35);
    ctx.lineTo(x+w*0.05,y+h*0.7); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.95,y+h*0.4); ctx.lineTo(x+w*0.7,y+h*0.35);
    ctx.lineTo(x+w*0.95,y+h*0.7); ctx.closePath(); ctx.fill();
  }},
  zomt: { w:32, h:32, draw(ctx,x,y,w,h) {
    // Body (large cyan beast based on pixel art)
    const c1='#44DDFF', c2='#2299CC', c3='#FFFFFF', c4='#CC3333', c5='#5555CC';
    // Back/body
    ctx.fillStyle=c1;
    ctx.fillRect(x+w*0.15,y+h*0.25,w*0.65,h*0.4);
    // Head
    ctx.fillStyle=c1;
    ctx.beginPath(); ctx.ellipse(x+w*0.8,y+h*0.2,w*0.18,h*0.18,0,0,Math.PI*2); ctx.fill();
    // Horns/ears
    ctx.fillStyle=c2;
    ctx.beginPath(); ctx.moveTo(x+w*0.72,y+h*0.08); ctx.lineTo(x+w*0.78,y+h*0.18);
    ctx.lineTo(x+w*0.68,y+h*0.18); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+w*0.88,y+h*0.06); ctx.lineTo(x+w*0.92,y+h*0.16);
    ctx.lineTo(x+w*0.82,y+h*0.16); ctx.fill();
    // Eye
    ctx.fillStyle=c4; ctx.beginPath(); ctx.arc(x+w*0.84,y+h*0.18,3,0,Math.PI*2); ctx.fill();
    // Spine ridge
    ctx.fillStyle=c3;
    ctx.fillRect(x+w*0.2,y+h*0.22,w*0.55,h*0.05);
    // Teeth/jaw
    ctx.fillStyle=c3;
    for(let i=0;i<5;i++) ctx.fillRect(x+w*(0.7+i*0.03),y+h*0.3,w*0.02,h*0.04);
    // Belly stripe
    ctx.fillStyle=c5;
    ctx.fillRect(x+w*0.2,y+h*0.45,w*0.5,h*0.08);
    // Front legs
    ctx.fillStyle=c1;
    ctx.fillRect(x+w*0.55,y+h*0.6,w*0.08,h*0.25);
    ctx.fillRect(x+w*0.65,y+h*0.6,w*0.08,h*0.25);
    // Claws front
    ctx.fillStyle=c2;
    ctx.fillRect(x+w*0.53,y+h*0.82,w*0.12,h*0.05);
    ctx.fillRect(x+w*0.63,y+h*0.82,w*0.12,h*0.05);
    // Back legs
    ctx.fillStyle=c1;
    ctx.fillRect(x+w*0.15,y+h*0.55,w*0.1,h*0.3);
    ctx.fillRect(x+w*0.28,y+h*0.58,w*0.08,h*0.27);
    // Claws back
    ctx.fillStyle=c2;
    ctx.fillRect(x+w*0.12,y+h*0.82,w*0.15,h*0.05);
    ctx.fillRect(x+w*0.26,y+h*0.82,w*0.12,h*0.05);
    // Tail
    ctx.fillStyle=c1;
    ctx.beginPath(); ctx.moveTo(x+w*0.15,y+h*0.35); ctx.lineTo(x,y+h*0.25);
    ctx.lineTo(x+w*0.05,y+h*0.15); ctx.lineTo(x+w*0.15,y+h*0.3); ctx.closePath(); ctx.fill();
    // Tail tip
    ctx.fillStyle=c2;
    ctx.beginPath(); ctx.moveTo(x+w*0.05,y+h*0.15); ctx.lineTo(x,y+h*0.08);
    ctx.lineTo(x+w*0.1,y+h*0.18); ctx.fill();
    // Wings
    ctx.fillStyle=c2; ctx.globalAlpha=0.7;
    ctx.beginPath(); ctx.moveTo(x+w*0.4,y+h*0.25); ctx.lineTo(x+w*0.25,y);
    ctx.lineTo(x+w*0.55,y+h*0.1); ctx.lineTo(x+w*0.5,y+h*0.25); ctx.closePath(); ctx.fill();
    ctx.globalAlpha=1.0;
  }},
};

// --- World Map (50x50) ---
// 0=grass 1=water 2=mountain 3=forest 4=town 5=cave 6=castle 7=bridge 8=desert 9=swamp
function generateWorldMap() {
  const W=50,H=50, m=[];
  for(let y=0;y<H;y++){m[y]=[];for(let x=0;x<W;x++)m[y][x]=0;}
  // Water border
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    if(x<2||x>=W-2||y<2||y>=H-2) m[y][x]=1;
  }

  // === South region (start area) ===
  // Forests around start village
  for(let y=38;y<47;y++)for(let x=3;x<18;x++){
    if(m[y][x]===0 && ((x+y)%3===0||(x*y)%7===1)) m[y][x]=3;
  }
  // Desert area SE
  for(let y=40;y<47;y++)for(let x=30;x<45;x++){
    if(m[y][x]===0) m[y][x]=8;
  }
  // Clear path around start town
  for(let y=42;y<47;y++) { m[y][10]=0; m[y][11]=0; }
  m[44][10]=4; // Start town

  // === Mid-south (path to lake town) ===
  // River E-W around y=36-37
  for(let x=4;x<40;x++){m[36][x]=1;m[37][x]=1;}
  // Bridge south (to cross river going north)
  m[36][12]=7; m[37][12]=7;
  // Path north from start
  for(let y=35;y<44;y++) { if(m[y][12]!==1&&m[y][12]!==7) m[y][12]=0; }

  // === Mid region (lake town area) ===
  // Lake around lake town (big lake)
  for(let y=28;y<36;y++)for(let x=16;x<28;x++){
    if(m[y][x]===0) m[y][x]=1;
  }
  // Lake town island
  for(let y=30;y<34;y++)for(let x=19;x<24;x++) m[y][x]=0;
  m[32][20]=4; // Lake town
  // Bridge to lake town from west
  m[32][16]=7; m[32][17]=7; m[32][18]=7;
  // Path from bridge to lake town area
  for(let x=12;x<17;x++) { if(m[32][x]!==1&&m[32][x]!==7) m[32][x]=0; }
  // Path north from river bridge area toward lake
  for(let y=28;y<36;y++) { if(m[y][12]!==1) m[y][12]=0; }

  // Forests mid-west
  for(let y=24;y<32;y++)for(let x=3;x<15;x++){
    if(m[y][x]===0 && ((x+y)%4===0||(x*2+y)%7===0)) m[y][x]=3;
  }

  // === Cave area (west of center) ===
  // Mountains around cave
  for(let y=18;y<26;y++)for(let x=6;x<18;x++){
    if((x-12)*(x-12)+(y-22)*(y-22)<16) m[y][x]=2;
  }
  // Clear cave entrance and path
  m[22][12]=5; // Cave entrance
  m[22][11]=0; m[22][13]=0; m[21][12]=0; m[23][12]=0;
  // Path from lake area north to cave
  for(let y=22;y<28;y++) { if(m[y][12]===3||m[y][12]===0) m[y][12]=0; }
  // Swamp near cave
  m[23][10]=9; m[24][10]=9; m[23][11]=9;

  // === East region (path to port town) ===
  // River N-S on east side around x=32-33
  for(let y=8;y<36;y++){m[y][32]=1;m[y][33]=1;}
  // Bridge east (mid level)
  m[25][32]=7; m[25][33]=7;
  // Path east from cave area across bridge
  for(let x=13;x<32;x++) { if(m[25][x]===0||m[25][x]===3) m[25][x]=0; }
  // Forest east of river
  for(let y=14;y<24;y++)for(let x=34;x<46;x++){
    if(m[y][x]===0 && ((x+y)%3===0)) m[y][x]=3;
  }
  // Port town area - coast
  for(let y=14;y<22;y++)for(let x=42;x<48;x++){
    if(m[y][x]===0||m[y][x]===3) m[y][x]=1;
  }
  m[18][38]=4; // Port town
  // Path from bridge east to port town
  for(let x=33;x<39;x++) { if(m[18][x]!==1) m[18][x]=0; }
  m[18][38]=4; // Re-place port town after path clearing
  for(let y=18;y<26;y++) { if(m[y][34]!==1&&m[y][34]!==7) m[y][34]=0; }
  // Clear port town surroundings
  for(let y=16;y<21;y++)for(let x=36;x<42;x++){
    if(m[y][x]===3||m[y][x]===1) m[y][x]=0;
  }
  m[18][38]=4; // Ensure port town tile survives clearing

  // === North region (dark castle) ===
  // Mountains north
  for(let y=3;y<10;y++)for(let x=6;x<20;x++){
    if((x-13)*(x-13)+(y-6)*(y-6)<18) m[y][x]=2;
  }
  for(let y=3;y<12;y++)for(let x=34;x<46;x++){
    if((x-40)*(x-40)+(y-7)*(y-7)<20) m[y][x]=2;
  }
  // Dark castle - north of port town
  m[4][40]=6;
  // Clear path to castle from south
  for(let y=4;y<18;y++) { m[y][40]=m[y][40]===6?6:0; m[y][41]=0; }
  // Connect port area to castle path
  for(let x=38;x<42;x++) { if(m[14][x]===0||m[14][x]===3||m[14][x]===2) m[14][x]=0; }

  // === Additional paths ===
  // Main north-south corridor on west side
  for(let y=10;y<28;y++) { if(m[y][12]===0||m[y][12]===3||m[y][12]===2) m[y][12]=0; }
  // Connect west corridor to east via mid path
  for(let x=12;x<34;x++) { if(m[12][x]===0||m[12][x]===3) m[12][x]=0; }

  return m;
}

const WORLD_MAP = generateWorldMap();

// --- Indoor Maps ---
// 0=floor 1=wall 2=outdoor(grass) 3=water 4=counter 5=door 6=stairs 7=chest 8=exit
const MAPS = {
  world: { width:50, height:50, tiles: WORLD_MAP, outdoor:true, encounterRate:0.06 },
  startTown: {
    width:16, height:16, outdoor:true, encounterRate:0,
    // はじまりの村 - 小さな村、中央に広場、北に城、南に出口
    tiles: [
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,1,1,1,1,1,2,0,2,1,1,1,1,1,2,2],
      [2,1,0,0,0,1,2,0,2,1,0,0,0,1,2,2],
      [2,1,0,0,4,1,2,0,2,1,0,0,4,1,2,2],
      [2,1,1,5,1,1,2,0,2,1,1,5,1,1,2,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
      [2,0,0,0,1,1,1,5,1,1,1,0,0,0,2,2],
      [2,0,0,0,1,0,9,0,0,9,1,0,0,0,2,2],
      [2,0,0,0,1,1,1,1,1,1,1,0,0,0,2,2],
      [2,2,2,0,0,1,0,0,0,1,0,0,2,2,2,2],
      [2,2,2,0,0,1,0,0,0,1,0,0,2,2,2,2],
      [2,2,2,0,0,1,0,0,0,1,0,0,2,2,2,2],
      [2,2,2,2,0,1,1,1,1,1,0,2,2,2,2,2],
      [2,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2],
      [2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,0,8,0,2,2,2,2,2,2,2],
    ],
    npcs: [
      { x:4, y:3, sprite:'npc_merchant', name:'ぶきや', dialog:['いらっしゃい！\nぶきを おさがしですか？'], shop:'weapon' },
      { x:12, y:3, sprite:'npc_merchant', name:'ぼうぐや', dialog:['いらっしゃい！\nぼうぐを おさがしですか？'], shop:'armor' },
      { x:3, y:5, sprite:'npc_woman', name:'むすめ', dialogFn: true, npcId:'startGirl' },
      { x:12, y:5, sprite:'npc_merchant', name:'どうぐや', dialog:['いらっしゃい！\nどうぐを おさがしですか？'], shop:'item1' },
      { x:13, y:5, sprite:'npc_oldman', name:'ちょうろう', dialogFn: true, npcId:'startElder' },
      { x:7, y:10, sprite:'npc_king', name:'おうさま', dialogFn: true, npcId:'king', event:'kingQuest' },
      { x:6, y:9, sprite:'npc_soldier', name:'へいし', dialogFn: true, npcId:'startGuard' },
      { x:2, y:5, sprite:'npc_woman', name:'おばあさん', dialogFn: true, npcId:'startOldLady' },
      { x:7, y:6, sprite:'npc_woman', name:'やどやのおかみ', inn:true, dialog:['おつかれさまですね。\nひとばん 5ゴールドです。\nゆっくり おやすみください。'] },
    ],
    exits: [{ x:7, y:15, map:'world', tx:10, ty:45 }],
    inn: { x:7, y:6, price:5 },
  },
  lakeTown: {
    width:16, height:16, outdoor:true, encounterRate:0,
    // みずうみの町 - 湖に囲まれた水辺の町
    tiles: [
      [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
      [3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,3],
      [3,3,0,0,0,0,0,0,0,0,1,1,1,1,3,3],
      [3,0,0,4,1,1,0,0,0,0,1,9,0,1,0,3],
      [3,0,0,5,1,1,0,0,0,0,1,1,5,1,0,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
      [3,0,0,0,0,0,3,3,3,0,0,0,0,0,0,3],
      [3,0,0,0,0,3,3,3,3,3,0,0,0,0,0,3],
      [3,0,0,0,0,3,3,3,3,3,0,0,0,0,0,3],
      [3,0,0,0,0,0,3,3,3,0,0,0,0,0,0,3],
      [3,0,0,4,1,1,0,0,0,4,1,1,0,0,0,3],
      [3,0,0,5,1,1,0,0,0,5,1,1,0,0,3,3],
      [3,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3],
      [3,3,0,0,0,0,0,0,0,0,0,0,3,3,3,3],
      [3,3,3,3,3,0,0,0,0,0,3,3,3,3,3,3],
      [3,3,3,3,3,3,0,8,0,3,3,3,3,3,3,3],
    ],
    npcs: [
      { x:3, y:3, sprite:'npc_merchant', name:'ぶきや', dialog:['いらっしゃい！\nちゅうきゅうの ぶきが\nそろっているよ！'], shop:'weapon15' },
      { x:9, y:3, sprite:'npc_merchant', name:'ぼうぐや', dialog:['よろいや たてが\nあるよ！'], shop:'armor15' },
      { x:3, y:10, sprite:'npc_merchant', name:'どうぐや', dialog:['どうぐは いかが？'], shop:'item15' },
      { x:9, y:10, sprite:'npc_merchant', name:'どうぐや2', dialog:['じょうやくそうや\nまほうのしずくが\nおすすめだよ！'], shop:'item15' },
      { x:13, y:5, sprite:'npc_oldman', name:'つりびと', dialogFn: true, npcId:'lakeFisher' },
      { x:2, y:7, sprite:'npc_woman', name:'はなうり', dialogFn: true, npcId:'lakeFlower' },
      { x:8, y:5, sprite:'npc_soldier', name:'みずもりへいし', dialogFn: true, npcId:'lakeGuard' },
      { x:12, y:9, sprite:'npc_oldman', name:'ものしりじいさん', dialogFn: true, npcId:'lakeScholar' },
      { x:7, y:12, sprite:'npc_woman', name:'こども', dialogFn: true, npcId:'lakeChild' },
      { x:12, y:4, sprite:'npc_woman', name:'やどやのおかみ', inn:true, dialog:['いらっしゃいませ！\nひとばん 10ゴールドです。\nみずうみの やどは\nいい ゆめが みられますよ。'] },
    ],
    exits: [{ x:7, y:15, map:'world', tx:20, ty:33 }],
    inn: { x:12, y:4, price:10 },
  },
  portTown: {
    width:16, height:16, outdoor:true, encounterRate:0,
    // うみべの町 - 港町、南東が海、北西に建物が集中
    tiles: [
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,0,0,4,1,0,0,0,0,0,4,1,0,0,2,2],
      [2,0,0,5,1,0,0,0,0,0,5,1,0,0,2,2],
      [2,0,0,0,0,1,1,1,0,0,0,0,0,0,2,2],
      [2,4,1,1,0,1,9,1,0,0,0,0,0,0,2,2],
      [2,5,1,1,0,1,5,1,0,0,0,0,0,0,3,3],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3],
      [2,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3],
      [2,0,0,0,0,4,1,1,0,0,0,3,3,3,3,3],
      [2,0,0,0,0,5,1,1,0,0,3,3,3,3,3,3],
      [2,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3],
      [2,2,0,0,0,0,0,0,3,3,3,3,3,3,3,3],
      [2,2,2,0,0,0,0,3,3,3,3,3,3,3,3,3],
      [2,2,2,0,0,0,3,3,3,3,3,3,3,3,3,3],
      [2,2,0,0,0,3,3,3,3,3,3,3,3,3,3,3],
      [2,2,0,8,0,3,3,3,3,3,3,3,3,3,3,3],
    ],
    npcs: [
      { x:3, y:1, sprite:'npc_merchant', name:'ぶきや', dialog:['うちは つよいぶきが\nそろっているよ！'], shop:'weapon2' },
      { x:10, y:1, sprite:'npc_merchant', name:'ぼうぐや', dialog:['ぼうぐは だいじだよ！'], shop:'armor2' },
      { x:5, y:8, sprite:'npc_merchant', name:'どうぐや', dialog:['いらっしゃい！\nどうぐは いかがですか？'], shop:'item2' },
      { x:8, y:3, sprite:'npc_soldier', name:'へいし', dialogFn: true, npcId:'portSoldier' },
      { x:2, y:3, sprite:'npc_woman', name:'みこ', dialogFn: true, npcId:'portPriestess' },
      { x:1, y:7, sprite:'npc_oldman', name:'せんちょう', dialogFn: true, npcId:'portCaptain' },
      { x:7, y:6, sprite:'npc_woman', name:'さかなうり', dialogFn: true, npcId:'portFishmonger' },
      { x:6, y:5, sprite:'npc_woman', name:'やどやのおかみ', inn:true, dialog:['おつかれさま！\nひとばん 15ゴールドです。\nうみの しおかぜが\nきもちいいですよ。'] },
    ],
    exits: [{ x:3, y:15, map:'world', tx:38, ty:19 }],
    inn: { x:6, y:5, price:15 },
  },
  cave: {
    width:16, height:16, outdoor:false, encounterRate:0.1, dark:true,
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
      [1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
      [1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
      [1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,8,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    npcs: [
      { x:14, y:1, sprite:'npc_oldman', name:'まよいびと', dialogFn: true, npcId:'caveLostMan' },
    ],
    exits: [{ x:1, y:14, map:'world', tx:12, ty:23 }],
    chests: [
      { x:1, y:1, item:'magicKey', taken:false },
    ],
    midBoss: { x:1, y:3, monsterId:'gargoyleBoss', flag:'caveBossDefeated' },
  },
  darkCastle: {
    width:16, height:16, outdoor:false, encounterRate:0.1,
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,0,0,0,1,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,7,0,0,0,0,0,0,0,1],
      [1,7,0,0,0,0,0,0,0,0,0,0,0,0,7,1],
      [1,0,0,0,0,0,0,8,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    npcs: [],
    exits: [{ x:7, y:14, map:'world', tx:40, ty:5 }],
    chests: [
      { x:1, y:14, item:'lightShield', taken:false },
      { x:14, y:14, item:'lightArmor', taken:false },
      { x:7, y:13, item:'lightSword', taken:false },
    ],
    midBoss: { x:7, y:11, monsterId:'darkKnightBoss', flag:'castleMidBossDefeated' },
    boss: { x:7, y:2, monsterId:'demonLord' },
  },
};

// World map location transitions
const WORLD_LOCATIONS = [
  { x:10, y:44, map:'startTown', tx:7, ty:14 },
  { x:20, y:32, map:'lakeTown', tx:7, ty:14 },
  { x:12, y:22, map:'cave', tx:1, ty:14 },
  { x:38, y:18, map:'portTown', tx:3, ty:14 },
  { x:40, y:4, map:'darkCastle', tx:7, ty:14 },
];

// --- Monsters ---
const MONSTERS = {
  puyopuyo:   { name:'プヨプヨ',     hp:5,   atk:3,  def:1,  spd:2,  exp:2,   gold:3,  sprite:'puyopuyo' },
  bat:        { name:'おおコウモリ',  hp:8,   atk:5,  def:2,  spd:5,  exp:4,   gold:5,  sprite:'bat' },
  goblin:     { name:'ゴブリン',     hp:15,  atk:8,  def:4,  spd:3,  exp:8,   gold:10, sprite:'goblin' },
  skeleton:   { name:'ガイコツへい', hp:22,  atk:12, def:8,  spd:4,  exp:14,  gold:18, sprite:'skeleton' },
  sorcerer:   { name:'まどうし',     hp:28,  atk:10, def:6,  spd:7,  exp:20,  gold:25, sprite:'sorcerer', magic:true },
  gargoyle:   { name:'ガーゴイル',   hp:40,  atk:18, def:14, spd:5,  exp:30,  gold:35, sprite:'gargoyle' },
  golem:      { name:'ゴーレム',     hp:55,  atk:25, def:22, spd:2,  exp:45,  gold:50, sprite:'golem' },
  darkKnight: { name:'あんこくきし', hp:65,  atk:30, def:20, spd:6,  exp:55,  gold:60, sprite:'darkKnight' },
  gargoyleBoss:{ name:'ガーゴイル',  hp:130, atk:34, def:22, spd:8,  exp:60,  gold:80, sprite:'gargoyle', boss:true, magic:true },
  darkKnightBoss:{ name:'あんこくきし', hp:350, atk:88, def:48, spd:10, exp:120, gold:150, sprite:'darkKnight', boss:true },
  demonLord:  { name:'まおう',       hp:300, atk:65, def:40, spd:11, exp:0,   gold:0,  sprite:'demonLord', boss:true, magic:true },
  zomt:       { name:'ゾムト',       hp:999, atk:80, def:45, spd:13, exp:0,   gold:0,  sprite:'zomt', boss:true, magic:true, sealOnly:true, sealMax:10 },
};

// Encounter tables by world map region
const ENCOUNTER_TABLES = {
  near:   ['puyopuyo','puyopuyo','puyopuyo','bat'],
  midnear:['puyopuyo','bat','bat','goblin'],
  mid:    ['bat','goblin','goblin','skeleton'],
  far:    ['skeleton','sorcerer','sorcerer'],
  cave:   ['bat','goblin','skeleton','gargoyle'],
  castle: ['gargoyle','golem','darkKnight','darkKnight'],
};

// --- Items ---
const ITEMS = {
  herb:       { name:'やくそう',       price:8,   type:'heal', value:30,  desc:'HPを30かいふくする' },
  strongHerb: { name:'じょうやくそう', price:30,  type:'heal', value:90,  desc:'HPを90かいふくする' },
  torch:      { name:'たいまつ',       price:15,  type:'field',value:0,   desc:'くらい ばしょを てらす' },
  magicKey:   { name:'まほうのカギ',   price:0,   type:'key',  value:0,   desc:'まほうの とびらを あける' },
  warpWing:   { name:'キメラのはね',   price:25,  type:'warp', value:0,   desc:'さいごの まちに もどる' },
  magicDrop:  { name:'まほうのしずく', price:20,  type:'mpHeal',value:20,  desc:'MPを20かいふくする' },
};

// --- Equipment ---
const WEAPONS = {
  club:       { name:'こんぼう',       price:10,   atk:2 },
  copperSword:{ name:'どうのつるぎ',   price:50,   atk:5 },
  ironSword:  { name:'てつのつるぎ',   price:200,  atk:10 },
  steelSword: { name:'はがねのつるぎ', price:800,  atk:20 },
  lightSword: { name:'ひかりのつるぎ', price:0,    atk:40 },
};
const ARMORS = {
  cloth:      { name:'ぬののふく',     price:10,   def:2 },
  leather:    { name:'かわのよろい',   price:60,   def:5 },
  chain:      { name:'くさりかたびら', price:250,  def:10 },
  ironArmor:  { name:'てつのよろい',   price:1000, def:20 },
  lightArmor: { name:'ひかりのよろい', price:0,    def:35 },
};
const SHIELDS = {
  leatherShield:{ name:'かわのたて',   price:30,   def:2 },
  ironShield:   { name:'てつのたて',   price:200,  def:5 },
  steelShield:  { name:'はがねのたて', price:700,  def:10 },
  lightShield:  { name:'ひかりのたて', price:0,    def:20 },
};

// --- Spells ---
const SPELLS = {
  heal:   { name:'ヒール',   mp:3,  type:'heal',   value:30,  learnLv:3,  desc:'HPを30かいふくする' },
  fire:   { name:'ファイア', mp:2,  type:'attack', value:12,  learnLv:5,  variance:5, desc:'ほのおで こうげき' },
  warp:   { name:'ワープ',   mp:8,  type:'field',  value:0,   learnLv:7,  desc:'さいごの まちに もどる' },
  healA:  { name:'ヒーラ',   mp:8,  type:'heal',   value:80,  learnLv:10, desc:'HPを80かいふくする' },
  fireA:  { name:'メガファイ',mp:5, type:'attack', value:45,  learnLv:13, variance:10,desc:'つよいほのおで こうげき' },
  escape: { name:'デグチ',   mp:6,  type:'field',  value:0,   learnLv:16, desc:'どうくつから だっしゅつする' },
  ultima: { name:'アルテマ', mp:15, type:'attack', value:120, learnLv:99, variance:20, desc:'さいきょうの ほうじゅつ' },
  roucon: { name:'ロウチョン', mp:8, type:'seal', value:0, learnLv:99, desc:'やみを ふういんする じゅもん' },
};

// --- Level Table ---
// [requiredExp, maxHp, maxMp, atk, def, spd]
const LEVEL_TABLE = [
  [0,     15,  0,   3,  2,  3],  // Lv1
  [10,    22,  0,   5,  3,  4],  // Lv2
  [30,    28,  5,   7,  5,  5],  // Lv3 - learn Heal
  [70,    36,  8,  10,  7,  6],  // Lv4
  [120,   44, 12,  14, 10,  8],  // Lv5 - learn Fire
  [200,   52, 16,  18, 13, 10],  // Lv6
  [320,   62, 22,  23, 16, 12],  // Lv7 - learn Warp
  [480,   72, 28,  28, 20, 14],  // Lv8
  [700,   84, 34,  34, 24, 16],  // Lv9
  [1000,  96, 42,  40, 28, 18],  // Lv10 - learn HealA
  [1400, 108, 48,  46, 32, 20],  // Lv11
  [1900, 120, 54,  52, 36, 22],  // Lv12
  [2500, 134, 60,  60, 42, 24],  // Lv13 - learn FireA
  [3200, 148, 66,  68, 48, 26],  // Lv14
  [4000, 160, 72,  76, 54, 28],  // Lv15
  [5000, 175, 80,  85, 60, 30],  // Lv16 - learn Escape
  [6200, 190, 88,  94, 66, 32],  // Lv17
  [7600, 200, 95, 104, 72, 34],  // Lv18
  [9500, 210,100, 114, 78, 36],  // Lv19
  [12000,220,110, 125, 85, 38],  // Lv20
];

// --- Shop inventories ---
const SHOPS = {
  weapon:  { type:'weapon', items:['club','copperSword'] },
  armor:   { type:'armor',  items:['cloth','leather','leatherShield'] },
  weapon15:{ type:'weapon', items:['copperSword','ironSword'] },
  armor15: { type:'armor',  items:['leather','chain','ironShield'] },
  item15:  { type:'item',   items:['herb','strongHerb','torch','warpWing'] },
  weapon2: { type:'weapon', items:['ironSword','steelSword'] },
  armor2:  { type:'armor',  items:['chain','ironArmor','ironShield','steelShield'] },
  item1:   { type:'item',   items:['herb','torch','warpWing'] },
  item2:   { type:'item',   items:['herb','strongHerb','magicDrop','torch','warpWing'] },
};

// --- NPC Dynamic Dialog System ---
function getNpcDialog(npcId, flags, level) {
  switch(npcId) {
    case 'startGirl':
      if (flags.zomtDefeated)
        return ['せかいに ひかりが もどったわ！','ゾムトくうかんに\nふういん したって\nきいたけど…','ゾムトくうかんって\nじかんも くうかんも\nない ばしょなんでしょ…','あなたが ふういんした\nおかげで もう だれも\nおそれることは ないわ。'];
      if (flags.bossDefeated)
        return ['まおうを たおしたの？','でも なにか いやな\nよかんがする…','ちょうろうさまが\n「ゾムトくうかん」って\nつぶやいてたわ…','いにしえから やみの\nちからが あふれだす\nとき ひらく くうかん\nだって…','きをつけて。'];
      if (flags.caveBossDefeated)
        return ['どうくつの ばんにんを\nたおしたんですって！','あなた ほんとうに\nつよくなったのね。','…むかし ちょうろうさまが\nいってたわ。','「ゆうしゃは せんねんに\nいちど うまれる」って。'];
      if (flags.gotQuest && level >= 5)
        return ['きたの やまに\nどうくつが あるそうよ。','どうくつの おくには\nでんせつの つるぎが\nねむっているって…','でも おそろしい\nばんにんが いるらしいわ。'];
      if (flags.gotQuest)
        return ['まずは きたの\nみずうみの まちに\nいってみたら？','かわを わたった\nさきにあるんだって。','あの まちなら\nぶきや ぼうぐも\nそろうらしいわよ。'];
      return ['あら、たびびとさん？','おうさまが あなたを\nおまちよ。','この むらの おくの\nおしろに いってみて。'];
    case 'startElder':
      if (flags.zomtDefeated)
        return ['おお… ゆうしゃよ。','ゾムトくうかんに\nやみを ふういんしたか。','ゾムトくうかんとは\nじかんも くうかんも\nこえた むの じゃ。','いちど はいったら\nにどと でられぬ\nえいえんの ろうごく。','そこに ゾムトを\nとじこめたのじゃから\nもう あんしんじゃ。','じつは おまえの\nちちおやも むかし\nゆうしゃだった。','おまえこそ しんの\nゆうしゃの けっとう。'];
      if (flags.bossDefeated)
        return ['まおうを たおしたか！','じゃが まだ やみの\nちからが きえておらん…','いにしえの いいつたえに\n「ゾムトくうかん」の\nことが かかれておる。','それは じかんも くうかんも\nこえた やみの はざま。','まおうの やみが\nときはなたれたとき\nやみは ゾムトとなり\nゾムトくうかんを もとめる。','ロウチョンで それを\nふういんするのじゃ！','なんども となえつづける\nことが たいせつじゃぞ。'];
      if (flags.caveBossDefeated)
        return ['どうくつの ばんにんを\nたおしたか。','おまえの ちちも かつて\nあの どうくつで\nつるぎを もとめた。','だが ちちは\nまおうとの たたかいで\nたおれてしまった…','おまえには ちちの\nいしを つぐ さだめが\nあるのかもしれん。'];
      if (flags.gotQuest && level >= 5)
        return ['おお、つよくなったのう。','じつは おまえの うまれには\nひみつが あるのじゃ。','おまえの ちちは かつて\nこのくにの ゆうしゃだった。','まおうと たたかい\nいのちを おとしたが…','そのちは おまえに\nながれておる。'];
      if (flags.gotQuest)
        return ['むかし この くにには\nひかりの おうが いた。','しかし おうは やみの\nちからに とりつかれ\nまおうと なったのじゃ。','まおうを すくうには\nひかりのつるぎが ひつようじゃ。'];
      return ['わしは この むらの\nちょうろうじゃ。','このくにには ふるい\nいいつたえが ある。','「やみに そまりし おうを\nすくうは ゆうしゃの\nつるぎのみ」とな。'];
    case 'king':
      if (flags.zomtDefeated)
        return ['おお ゆうしゃよ！','ゾムトを ゾムトくうかんに\nふういんしてくれたか！','ゾムトくうかんとは\nじかんも くうかんも ない\nえいえんの ろうごくじゃ。','いちど はいった やみは\nにどと でられぬ。','これで せかいは\nほんとうに すくわれた！','…そして あの まおうも\nもとは わが とも だった。','おまえが すくって\nくれたのじゃ。ありがとう。'];
      if (flags.bossDefeated)
        return ['なんと まおうを たおしたか！','しかし まだ やみの\nきはいが きえぬ…','まおうの やみが\nときはなたれるとき\n「ゾムト」が うまれると\nいいつたえが ある。','ゾムトは 「ゾムトくうかん」\nという じかんも くうかんも\nない 「む」に\nふういんするしかない。','ロウチョンの じゅもんを\nなんども となえて\nふういんするのじゃ！','きを ゆるめるでない！'];
      if (flags.castleMidBossDefeated)
        return ['おお！ まおうの ぶかを\nたおし ひかりのつるぎを\nてにいれたか！','いまこそ まおうに\nいどむ ときじゃ！','きたの しろに\nまおうが まっておる！'];
      if (flags.caveBossDefeated)
        return ['どうくつの ばんにんを\nたおしたか！ みごとじゃ！','つぎは まおうの しろに\nむかうのじゃ。','しろの おくには まおうの\nぶかが ひかりのつるぎを\nまもっておる。','ぶかを たおし つるぎを\nてにいれるのじゃ！'];
      if (flags.gotQuest && level >= 7)
        return ['おお ゆうしゃよ。\nたくましくなったのう！','じつは まおうは もとは\nこのくにの おうじゃった。','「ひかりのおう」と よばれ\nみなに したわれておった。','しかし やみの ちからに\nとりつかれ まおうと\nなってしまったのじゃ…','ひかりのつるぎで\nおうの こころを\nとりもどしてくれ！'];
      if (flags.gotQuest && level >= 5)
        return ['おうさま「たのんだぞ\nゆうしゃよ！」','つぎは きたの やまの\nどうくつを めざすのじゃ。','どうくつの おくには\nまほうのカギが あるはず。','ばんにんを たおせば\nきょうりょくな じゅもんも\nみにつくであろう。'];
      if (flags.gotQuest)
        return ['おうさま「たのんだぞ\nゆうしゃよ！」','まずは きたにある\nみずうみの まちを\nめざすのじゃ。','まちで そうびを\nととのえ ちからを\nつけるのじゃ。','じゅうぶん つよくなったら\nさらに きたの やまの\nどうくつへ むかうがよい。'];
      return ['おお ゆうしゃよ！','まおうが ひかりのつるぎを\nうばって いったのじゃ！','まおうは もとは この くにの\nおうだったのじゃが…','やみの ちからに\nとりつかれてしもうた。','どうか つるぎを\nとりもどし おうの\nこころを すくってくれ！'];
    case 'portSoldier':
      if (flags.zomtDefeated)
        return ['あんたが せかいを\nすくった ゆうしゃか！','ゾムトを ゾムトくうかん\nに ふういんしたと\nきいたぞ！','ゾムトくうかん…\nじかんも くうかんも ない\nばしょ だったよな。','そんな ところに\nふういんされたら\nもう でてこれねえな。','ありがとう。'];
      if (flags.castleMidBossDefeated)
        return ['まおうの ぶかを\nたおしたらしいな！','ひかりのつるぎが あれば\nまおうに かてるはずだ。','きたの しろに\nいってこい！'];
      if (flags.caveBossDefeated)
        return ['どうくつの ばんにんを\nたおしたのか！','つぎは きたの まおうの\nしろだな。','しろには まおうの ぶかが\nいるらしい。','そいつを たおせば\nひかりのつるぎが\nてにはいるぞ。'];
      if (level >= 10)
        return ['おまえ ずいぶん\nつよくなったな。','きたにある しろに\nまおうが すんでいる。','しろの おくに ひかりの\nつるぎが あるらしい。','まおうの ぶかが\nまもっているそうだ。'];
      return ['きたにある しろに\nまおうが すんでいる。','あのしろに はいるには\nそうとうの つよさが\nひつようだぞ。','まずは ちからを\nつけてから いけ。'];
    case 'portPriestess':
      if (flags.zomtDefeated)
        return ['ひかりの かみよ…','ゆうしゃが ゾムトを\nゾムトくうかんに\nふういんしました。','ゾムトくうかんとは\nじかんの ながれも\nくうかんの ひろがりも\nない むです。','いちど おちた やみは\nえいえんに とじられ\nにどと もどりません。','あなたの たびは\nでんせつとして\nかたりつがれるでしょう。'];
      if (flags.bossDefeated)
        return ['やみの きはいが\nまだ のこっています…','いにしえの しんでんに\n「ゾムトくうかん」の\nことが かかれています。','ゾムトくうかんとは\nじかんの ながれも\nくうかんの ひろがりも\nこえた むです。','やみの ちからは そこに\nとじられると えいえんに\nでられなくなります。','ロウチョンを なんども\nとなえて ゾムトを\nふういんするのです。','おいのり します。\nひかりの かみよ\nゆうしゃを おまもりください。'];
      if (flags.caveBossDefeated)
        return ['あなたの なかに\nつよい ひかりを かんじます。','その ひかりは\nせんねんまえの ゆうしゃと\nおなじもの…','あなたは えらばれし\nもの なのかもしれません。'];
      if (level >= 7)
        return ['あなた…もしかして\nゆうしゃの けっとう？','せんねんまえ ひかりの\nゆうしゃが まおうを\nふういんしました。','しかし ふういんは とけ\nまおうは ふっかつした。','あたらしい ゆうしゃが\nひつようなのです。'];
      return ['ここは いのりの ばしょ。','たびの あんぜんを\nおいのり します。','ひかりの かみよ\nこの たびびとを\nおまもりください。'];
    case 'caveLostMan':
      if (flags.caveBossDefeated)
        return ['おお たすかった！','あの おそろしい\nばけものが いなくなって\nやっと かえれるわい。','きみは ほんとうに\nつよいのう。','…じつは この どうくつの\nおくには いにしえの\nいしぶみが あってのう。','「ゾムトくうかん」について\nかかれておった。','じかんも くうかんも ない\nむの くうかんじゃと。','やみを そこに ふういん\nすると もう でられぬと…\nそのくらいしか\nわしには わからんがのう。'];
      return ['たすけてくれ…！','わしは ここに\nまよいこんで しまった。','おくに おそろしい\nばけものが おって\nにげられんのじゃ…','あの ばけものを\nたおしてくれんか？'];
    case 'startGuard':
      if (flags.zomtDefeated) return ['ゆうしゃどの！\nせかいを すくって\nくれたんだな！','おれも いつか\nあんたみたいに\nつよくなりたいぜ。','この むらも\nこれで あんたいだ。'];
      if (flags.gotQuest && level < 4)
        return ['ここの まわりは\nプヨプヨや コウモリが\nでるくらいだ。','レベル4くらいまでは\nむらの ちかくで\nたたかうのが いいぞ。','むりして とおくに\nいくんじゃねえぞ。'];
      if (flags.gotQuest && level >= 4)
        return ['おっ だいぶ\nつよくなったな。','みずうみの まちまでなら\nいけるんじゃないか？','きたへ かわを わたった\nさきにあるぞ。','レベル6くらいあれば\nあんぜんだろう。'];
      return ['おれは この むらの\nもんばんだ。','へいわな むらだが\nそとには まものが\nでるから きをつけろ。','まあ むらの ちかくなら\nよわい やつしか\nでないがな。'];
    case 'startOldLady':
      if (flags.zomtDefeated) return ['あらまあ\nゆうしゃさん！','せかいが へいわに\nなったのね。','おばあちゃんは\nうれしいわ。','これからは あんしんして\nはたけしごとが\nできるわねえ。'];
      if (flags.gotQuest)
        return ['あらあら たいへんね。','むかしは この むらも\nにぎやかだったのよ。','まおうが あらわれてから\nたびびとが へって\nしまってねえ…','やくそうは いつも\nもっておくのよ。','おばあちゃんからの\nちゅうこくよ。'];
      return ['あらまあ\nたびびとさん？','めずらしいわねえ。','さいきん この あたりにも\nまものが でるように\nなってねえ…','きをつけなさいよ。','ところで おなかは\nすいてない？\nやどやで やすむと\nいいわよ。'];
    case 'lakeFisher':
      if (flags.zomtDefeated) return ['おお！ ゆうしゃどの！','おかげで あんしんして\nつりが できるわい。','きょうは おおものが\nつれそうじゃ。','へいわって いいのう。'];
      if (flags.caveBossDefeated)
        return ['どうくつの ばんにんを\nたおしたと きいたぞ！','たいしたもんだ。','わしも わかいころは\nぼうけんしゃに\nあこがれたもんだ。','…まあ つりのほうが\nせいにあっとるがな。'];
      return ['わしは つりが\nしゅみでな。','この みずうみは\nさかなが よく つれる。','…ところで きみ\nぼうけんしゃ かね？','きたの やまに\nどうくつが あるそうだが\nレベル7は ないと\nきけんじゃろう。','じゅうぶん したくを\nしてから いくんじゃぞ。'];
    case 'lakeFlower':
      if (flags.zomtDefeated) return ['おはなが きれいに\nさいたわ！','せかいに ひかりが\nもどったから\nおはなも よろこんでるの。','あなたに これ あげる。\nありがとう ゆうしゃさん。'];
      return ['おはなは いかが？','この みずうみの まわりには\nきれいな はなが\nたくさん さくのよ。','…でも さいきんは\nまものが ふえて\nはなつみにも いけなくて。','はやく へいわに\nなるといいわね。'];
    case 'lakeGuard':
      if (flags.zomtDefeated) return ['ゆうしゃどの！\nおつかれさまです！','この まちも\nあんたいです。','もう まものの\nしんぱいも ありません。'];
      if (flags.caveBossDefeated)
        return ['どうくつの ばんにんを\nたおしたのですか！','すばらしい！','つぎは まおうの しろ\nですが…','あのしろに いくには\nレベル12は ほしい\nところです。','うみべの まちで\nじょうぶな そうびを\nそろえてから\nむかうべきです。'];
      if (level >= 5)
        return ['あなたは なかなか\nつよそうですね。','きたの やまに\nどうくつが あるのですが\nそこには てごわい\nまものが います。','レベル7くらいに\nなったら いどんで\nみてもいいかも\nしれません。','どうくつは くらいので\nたいまつを もって\nいくことを おすすめします。'];
      return ['この まちは みずうみに\nかこまれた\nあんぜんな まちです。','わたしは この まちの\nけいびを しています。','まちの そとには\nゴブリンや コウモリが\nでますから\nきをつけてください。','レベル5くらいは\nないと この あたりは\nきけんですよ。'];
    case 'lakeScholar':
      if (flags.zomtDefeated)
        return ['ほほう… ゾムトくうかんに\nやみを ふういんしたか。','わしの けんきゅうが\nやくにたったようじゃな。','ゾムトくうかんとは\nじかんの ながれも\nくうかんの ひろがりも\nない ぜったいの む。','そこに とじこめられた\nものは えいえんに\nでることは できん。','これで せかいは\nしんの へいわを\nとりもどしたのじゃ。'];
      if (flags.bossDefeated)
        return ['ゾムトくうかんについて\nしらべておったのじゃ。','いにしえの ぶんけんに\nよると ゾムトくうかんは\n「むげんの むの はざま」\nと よばれておる。','じかんも くうかんも\nそんざいしない\nばしょじゃ。','そこに やみを\nふういんするには\nロウチョンの じゅもんを\nなんども となえる\nひつようが あるそうじゃ。'];
      if (flags.caveBossDefeated)
        return ['どうくつの おくで\nふるい いしぶみを\nみつけたそうじゃな。','あの いしぶみには\nゾムトくうかんの\nことが かかれておる。','じかんも くうかんも ない\nむの はざま…','まおうの やみが\nときはなたれたとき\nそれは おそろしい\nちからと なるらしい。'];
      return ['わしは ものしりの\nじいさんじゃ。','この せかいの\nれきしを しらべて\nおるのじゃ。','むかし この くにには\n「ひかりのおう」と\nよばれた おうが おった。','みなに したわれた\nすばらしい おうじゃった。','しかし あるひ\nやみの ちからに\nとりつかれてしもうた…','それが いまの\nまおうじゃと\nいわれておる。'];
    case 'lakeChild':
      if (flags.zomtDefeated) return ['ゆうしゃさん\nすごーい！','ぼくも おおきくなったら\nゆうしゃに なるんだ！','…でも まず\nおかあさんの おてつだい\nしなきゃ。'];
      if (flags.caveBossDefeated)
        return ['ゆうしゃさん\nつよいんだね！','ぼくも つよくなりたいな。','でも おかあさんが\n「まだ はやい」って。'];
      return ['あのね あのね！','きのう みずうみで\nおおきな さかなを\nみたんだよ！','こーんなに おおきいの！','…うそじゃないよ？\nほんとだよ？','ねえ ゆうしゃさんって\nつよいの？\nまものと たたかうの？'];
    case 'portCaptain':
      if (flags.zomtDefeated) return ['やあ ゆうしゃどの！','あんたの おかげで\nうみも おだやかに\nなったぜ。','これで あんしんして\nりょこうに でられる。','わしも むかしは\nぼうけんしゃに\nあこがれたもんだ。','いまは ふねの うえが\nいちばん おちつくがな。'];
      if (flags.caveBossDefeated)
        return ['おお ぼうけんしゃか。','まおうの しろに\nいくつもりか？','あの しろの まわりは\nつよい まものだらけだ。','レベル12は ないと\nきびしいだろうな。','まほうのしずくを\nたくさん もっていけ。\nMPが きれたら\nおしまいだからな。'];
      return ['わしは せんちょうだ。','むかしは いろんな\nくにを まわったもんだ。','しかし まおうが\nあらわれてからは\nうみも あぶなくなってな。','…はやく へいわに\nなってほしいもんだ。','ところで にいちゃん\nのみすぎるなよ。'];
    case 'portFishmonger':
      if (flags.zomtDefeated) return ['あら ゆうしゃさん！','おさかな いかが？','きょうは しんせんな\nのが たくさん\nはいったわよ！','せかいが へいわに\nなって さかなも\nよく とれるように\nなったのよ。'];
      return ['いらっしゃい！\nしんせんな おさかな\nいかがですか？','…あら ぼうけんしゃさん？','たべものは だいじよ。','たたかいの まえには\nしっかり たべて\nちからを つけなきゃ。','やどやで いっぱく\nすると げんきに\nなるわよ。'];
    default:
      return ['…。'];
  }
}
