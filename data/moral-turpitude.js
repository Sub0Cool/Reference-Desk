// California criminal witness-impeachment research. Not an immigration CIMT table.
// A missing entry is NOT a negative moral-turpitude determination.
// Research snapshots are limited; verify current law and the applicable historical statute.
window.REFERENCE_DESK_MORAL_TURPITUDE = [
  {
    code:"PC",section:"459",name:"Burglary",aliases:["burglary"],
    conviction:{status:"yes",summary:"A felony burglary conviction necessarily involves moral turpitude under Collins, including burglary with intent to commit a felony other than theft.",authority:["collins"]},
    misconduct:{status:"fact-dependent",summary:"Evaluate the proven underlying conduct. Conduct involving dishonest entry or another morally turpitudinous act may be probative, subject to evidentiary limits.",authority:["wheeler"]},
    caveat:"Collins addressed felony burglary. Confirm the conviction's classification and the statutory version in effect at the time.",
    reviewed:"2026-10-09"
  },
  {
    code:"PC",section:"240",name:"Simple assault",aliases:["assault"],
    conviction:{status:"no",summary:"Simple assault does not necessarily involve moral turpitude under the least-adjudicated-elements analysis.",authority:["thomas"]},
    misconduct:{status:"fact-dependent",summary:"The particular assaultive conduct may independently reveal moral turpitude; the offense label alone does not decide the question.",authority:["wheeler"]},
    caveat:"Section 240 itself defines assault; consult the charged punishment provision and actual offense of conviction.",reviewed:"2026-10-09"
  },
  {
    code:"PC",section:"242",name:"Simple battery",aliases:["battery"],
    conviction:{status:"no",summary:"The least touching can constitute battery; simple battery does not necessarily involve moral turpitude.",authority:["thomas"]},
    misconduct:{status:"fact-dependent",summary:"The underlying misconduct can involve moral turpitude depending on proven facts, even though simple battery does not necessarily do so.",authority:["wheeler"]},
    caveat:"Do not confuse a misdemeanor conviction document with admissible proof of the underlying acts.",reviewed:"2026-10-09"
  },
  {
    code:"PC",section:"243(d)",name:"Battery causing serious bodily injury",aliases:["felony battery","serious bodily injury battery"],
    conviction:{status:"no",summary:"Thomas held that battery causing serious bodily injury does not necessarily involve moral turpitude because the injury can result from the least touching.",authority:["thomas"]},
    misconduct:{status:"fact-dependent",summary:"The seriousness and nature of the actual conduct may support moral turpitude; assess the evidence of the acts rather than the conviction label alone.",authority:["wheeler"]},
    caveat:"Historical elements and case-specific conduct must be separately considered.",reviewed:"2026-10-09"
  }
];
window.REFERENCE_DESK_MT_AUTHORITIES = {
  castro:{name:"People v. Castro",citation:"(1985) 38 Cal.3d 301, 316–317",url:"https://law.justia.com/cases/california/supreme-court/3d/38/301.html"},
  wheeler:{name:"People v. Wheeler",citation:"(1992) 4 Cal.4th 284, 295–300",url:"https://law.justia.com/cases/california/supreme-court/4th/4/284.html"},
  collins:{name:"People v. Collins",citation:"(1986) 42 Cal.3d 378, 395",url:"https://law.justia.com/cases/california/supreme-court/3d/42/378.html"},
  thomas:{name:"People v. Thomas",citation:"(1988) 206 Cal.App.3d 689, 693–696",url:"https://law.justia.com/cases/california/court-of-appeal/3d/206/689.html"},
  garcia:{name:"People v. Garcia",citation:"(2004) 116 Cal.App.4th 404 (review granted; do not treat as binding precedent)",url:"https://law.justia.com/cases/california/court-of-appeal/2004/a098872a.html"}
};