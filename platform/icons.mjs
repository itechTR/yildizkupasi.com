const paths={
 trophy:'<path d="M8 3h8v6a4 4 0 0 1-8 0V3Z"/><path d="M8 5H5v3a4 4 0 0 0 4 4m7-7h3v3a4 4 0 0 1-4 4M12 13v5m-4 3h8m-7-3h6v3H9z"/>',
 shield:'<path d="M12 2 4 5v6c0 5 8 10 8 10s8-5 8-10V5l-8-3Z"/><path d="m8 6 8 10M16 6 8 16m-1-9 2-2m6 0 2 2"/>',
 ball:'<circle cx="12" cy="12" r="9"/><path d="m12 7 5 4-2 6H9l-2-6 5-4Zm0 0V3m5 8 4-1m-6 7 2 3m-8-3-2 3m0-9-4-1"/>',
 calendar:'<rect x="4" y="5" width="16" height="16" rx="1"/><path d="M7 2v6m10-6v6M4 10h16"/>',
 network:'<circle cx="12" cy="4" r="2"/><circle cx="5" cy="11" r="2"/><circle cx="19" cy="11" r="2"/><circle cx="8" cy="20" r="2"/><circle cx="16" cy="20" r="2"/><path d="m10 6-3 3m7-3 3 3M5 13l2 5m12-5-2 5m-8-6h6m-3 2v4"/>',
 chart:'<path d="M3 21h18M5 16V9m4 9V4m4 12V7m4 11V2m4 14v-5M3 6h1m16 2h1"/>',
 story:'<path d="M14 4H5v17h14V11M9 3H3v16m7-5 1-4 7-7 3 3-7 7-4 1Zm6-9 3 3"/>',
 archive:'<rect x="3" y="7" width="18" height="14" rx="1"/><path d="M4 7V3h16v4M8 11h8M7 5h10"/>'
};
export const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.ball}</svg>`;
