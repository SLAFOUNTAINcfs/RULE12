(()=>{
  const teeSwatch={
    Red:{fill:'#D63A3A',stroke:'#F6B0B0'},
    'Gold/Yellow':{fill:'#D7B43A',stroke:'#FFF0A6'},
    White:{fill:'#F4F7FB',stroke:'#AAB3C2'},
    Blue:{fill:'#356FD4',stroke:'#A7C7FF'},
    Black:{fill:'#05070A',stroke:'#F4F7FB'}
  };
  const rarityAccent={Common:'#8A94A6',Rare:'#4EA1FF',Epic:'#B56CFF',Legendary:'#F2C94C'};

  function teeInfo(profile){
    const label=profile.teeLabel||'White Tees';
    const color=profile.teeColor||'White';
    return {label,color,swatch:teeSwatch[color]||teeSwatch.White};
  }

  function compactChipTarget(rarity){
    return {
      Common:'1 flagstick',
      Rare:'1/2 flagstick',
      Epic:'3 foot lengths',
      Legendary:'1 foot length'
    }[rarity]||'1 flagstick';
  }

  function screenCharacterCardSvg(profile){
    const accent=rarityAccent[profile.rarity]||'#F2C94C';
    const tee=teeInfo(profile);
    const rows=CLUBS.map((club,index)=>{const y=570+index*31;const fill=index%2===0?'#131A25':'#1A2230';return`<rect x="26" y="${y}" width="368" height="28" rx="8" fill="${fill}"/><text x="40" y="${y+19}" class="club">${escapeHtml(club)}</text><text x="378" y="${y+19}" text-anchor="end" class="val">${profile.clubs[club]} yd</text>`}).join('');
    const windowPct=Math.round(DISTANCE_RULES[profile.rarity].halfWindowRate*100);
    const reward=format(DISTANCE_RULES[profile.rarity].reward);
    return`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 1100" role="img" aria-labelledby="title desc"><title id="title">Roll Play Golf ${escapeHtml(profile.rarity)} ${escapeHtml(profile.archetypeName)} character card</title><desc id="desc">Modeled total-distance club targets and ${escapeHtml(tee.label)} recommendation for a ${escapeHtml(profile.gender)} ${escapeHtml(profile.ageGroup)} ${escapeHtml(profile.rarity)} golfer character.</desc><rect x="8" y="8" width="404" height="1084" rx="24" fill="#0B111A" stroke="${accent}" stroke-width="3"/><text x="210" y="58" text-anchor="middle" class="brand">ROLL PLAY GOLF</text><text x="210" y="84" text-anchor="middle" class="sub">A GOLF RPG</text><rect x="24" y="108" width="372" height="170" rx="14" fill="#141D2A" stroke="#2A3445"/><text x="40" y="140" class="head">${escapeHtml(profile.archetypeName).toUpperCase()}</text><text x="40" y="168" class="meta">${profile.gender} • ${escapeHtml(profile.ageGroup)}</text><text x="40" y="198" class="rarity">${profile.rarity.toUpperCase()} — ${escapeHtml(profile.performanceLabel)}</text><circle cx="48" cy="229" r="9" fill="${tee.swatch.fill}" stroke="${tee.swatch.stroke}" stroke-width="2"/><text x="66" y="235" class="meta">TEE: ${escapeHtml(tee.label).toUpperCase()}</text><text x="40" y="256" class="metaSmall">Role locked for this round</text><rect x="24" y="298" width="372" height="132" rx="14" fill="#141D2A" stroke="#2A3445"/><text x="40" y="328" class="head">DISTANCE QUEST</text><text x="40" y="358" class="metaSmall">Finish within ±${windowPct}% of the selected target</text><text x="40" y="386" class="metaSmall">Reward: ${reward} stroke${Number(reward)===1?'':'s'} per success</text><text x="40" y="414" class="metaSmall">All values are modeled total distance</text><text x="28" y="548" class="head">CLUB TARGETS</text>${rows}<text x="210" y="1064" text-anchor="middle" class="note">Driver off the deck or next-closest club allowed • Putter allowed on green</text><style>.brand{fill:#F4F7FB;font:800 25px system-ui,sans-serif}.sub{fill:#AAB3C2;font:700 14px system-ui,sans-serif}.rarity,.head{fill:${accent};font:800 15px system-ui,sans-serif}.meta{fill:#E7ECF7;font:600 15px system-ui,sans-serif}.metaSmall{fill:#D7DFED;font:600 13px system-ui,sans-serif}.club{fill:#E7ECF7;font:600 14px system-ui,sans-serif}.val{fill:#F4F7FB;font:700 14px system-ui,sans-serif}.note{fill:#AAB3C2;font:600 11px system-ui,sans-serif}</style></svg>`;
  }

  function printableCharacterCardSvg(profile){
    const accent=rarityAccent[profile.rarity]||'#F2C94C';
    const tee=teeInfo(profile);
    const distanceRule=DISTANCE_RULES[profile.rarity];
    const puttingRule=PUTTING_RULES[profile.rarity];
    const left=CLUBS.slice(0,8);
    const right=CLUBS.slice(8);
    const row=(club,x,y,width,index)=>`<rect x="${x}" y="${y}" width="${width}" height="27" rx="5" fill="${index%2===0?'#131A25':'#1A2230'}"/><text x="${x+9}" y="${y+19}" class="club">${escapeHtml(club)}</text><text x="${x+width-9}" y="${y+19}" text-anchor="end" class="val">${profile.clubs[club]}</text>`;
    const leftRows=left.map((club,index)=>row(club,24,300+index*30,218,index)).join('');
    const rightRows=right.map((club,index)=>row(club,258,300+index*30,218,index)).join('');
    const windowPct=Math.round(distanceRule.halfWindowRate*100);
    return`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" role="img" aria-labelledby="title desc"><title id="title">Printable Roll Play Golf ${escapeHtml(profile.rarity)} ${escapeHtml(profile.archetypeName)} playing card</title><desc id="desc">Poker-size character card with tee color, distance quest, club targets, putting quest, and short-game quest.</desc><rect x="5" y="5" width="490" height="690" rx="24" fill="#0B111A" stroke="${accent}" stroke-width="4"/><rect x="15" y="15" width="470" height="670" rx="18" fill="none" stroke="${accent}" stroke-opacity=".22" stroke-width="2"/><text x="250" y="42" text-anchor="middle" class="brand">ROLL PLAY GOLF</text><text x="250" y="63" text-anchor="middle" class="sub">A GOLF RPG</text><text x="250" y="94" text-anchor="middle" class="archetype">${escapeHtml(profile.archetypeName).toUpperCase()}</text><text x="250" y="117" text-anchor="middle" class="meta">${escapeHtml(profile.gender)} • ${escapeHtml(profile.ageGroup)}</text><text x="250" y="142" text-anchor="middle" class="rarity">${profile.rarity.toUpperCase()} • ${escapeHtml(profile.performanceLabel)}</text><rect x="24" y="158" width="452" height="58" rx="12" fill="#141D2A" stroke="#2A3445"/><circle cx="48" cy="187" r="11" fill="${tee.swatch.fill}" stroke="${tee.swatch.stroke}" stroke-width="2"/><text x="68" y="183" class="teeHead">TEE</text><text x="68" y="203" class="teeVal">${escapeHtml(tee.label).toUpperCase()}</text><text x="462" y="181" text-anchor="end" class="quest">±${windowPct}% TARGET</text><text x="462" y="202" text-anchor="end" class="quest">${format(distanceRule.reward)} STROKE REWARD</text><text x="24" y="244" class="section">CLUB TARGETS • TOTAL YARDS</text><line x1="24" y1="254" x2="476" y2="254" stroke="#2A3445"/>${leftRows}${rightRows}<rect x="24" y="552" width="452" height="86" rx="12" fill="#141D2A" stroke="#2A3445"/><text x="39" y="578" class="section">PUTTING QUEST</text><text x="39" y="600" class="detail">≤ ${puttingRule.maximumAveragePuttsPerHole.toFixed(2)} putts / completed hole</text><text x="39" y="622" class="detail">Full-round bonus: ${puttingRule.fullBonus.toFixed(2)} stroke${puttingRule.fullBonus===1?'':'s'} • prorated for partial rounds</text><text x="39" y="654" class="section">SHORT-GAME QUEST</text><text x="210" y="654" class="detail">Finish within ${escapeHtml(compactChipTarget(profile.rarity))}</text><text x="250" y="678" text-anchor="middle" class="footer">Role locked for this round • Driver off deck allowed • Putter allowed on green</text><style>.brand{fill:#F4F7FB;font:800 24px system-ui,sans-serif;letter-spacing:.8px}.sub{fill:#AAB3C2;font:700 12px system-ui,sans-serif;letter-spacing:1px}.archetype{fill:#F4F7FB;font:850 20px system-ui,sans-serif}.meta{fill:#D7DFED;font:700 15px system-ui,sans-serif}.rarity,.section{fill:${accent};font:850 15px system-ui,sans-serif;letter-spacing:.5px}.teeHead{fill:#AAB3C2;font:800 11px system-ui,sans-serif}.teeVal{fill:#F4F7FB;font:850 15px system-ui,sans-serif}.quest{fill:#E7ECF7;font:800 13px system-ui,sans-serif}.club{fill:#DDE5F1;font:700 16px system-ui,sans-serif}.val{fill:#F4F7FB;font:850 17px system-ui,sans-serif}.detail{fill:#D7DFED;font:650 13px system-ui,sans-serif}.footer{fill:#AAB3C2;font:650 10px system-ui,sans-serif}</style></svg>`;
  }

  function printableDataUrl(profile){return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(printableCharacterCardSvg(profile))}`}

  renderCharacterCardSvg=screenCharacterCardSvg;
  characterCardDataUrl=(profile)=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(screenCharacterCardSvg(profile))}`;
  renderPrintCards=()=>{
    const pages=[];
    for(let index=0;index<state.profiles.length;index+=9)pages.push(state.profiles.slice(index,index+9));
    els.printGrid.innerHTML=pages.map((profiles,pageIndex)=>`<section class="print-page" aria-label="Character card print sheet ${pageIndex+1} of ${pages.length}">${profiles.map((profile)=>`<article class="print-card" aria-label="${escapeHtml(profile.rarity)} ${escapeHtml(profile.archetypeName)} printable card"><img src="${printableDataUrl(profile)}" alt="Printable Roll Play Golf ${escapeHtml(profile.rarity)} ${escapeHtml(profile.archetypeName)} playing card"></article>`).join('')}</section>`).join('');
  };

  const baseRenderState=renderState;
  renderState=()=>{
    baseRenderState();
    const profile=activeProfile();
    if(profile&&els.teeYardage)els.teeYardage.textContent=profile.teeLabel||'White Tees';
  };

  window.addEventListener('beforeprint',()=>renderPrintCards());
  renderPrintCards();
  renderState();
})();
