const sampleNodes = [
  {name:"Main Substation"},{name:"Academic Block"},{name:"Library"},
  {name:"Hostel Block"},{name:"Canteen"},{name:"Administration Block"}
];
const sampleEdges = [
  {u:0,v:1,weight:4},{u:0,v:2,weight:3},{u:1,v:2,weight:2},
  {u:1,v:3,weight:5},{u:2,v:3,weight:3},{u:2,v:4,weight:6},
  {u:3,v:4,weight:4},{u:3,v:5,weight:7},{u:4,v:5,weight:2}
];
let nodes = structuredClone(sampleNodes);
let edges = structuredClone(sampleEdges);
let outputs = {prim:null, kruskal:null};
let activeMst = [];
const $ = id => document.getElementById(id);
const svgNS = "http://www.w3.org/2000/svg";

function toast(message) {
  const el = $("toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove("show"),2800);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function nodePositions() {
  const cx=350, cy=190, rx=245, ry=135;
  return nodes.map((n,i)=>{
    const a=(-Math.PI/2)+(2*Math.PI*i/nodes.length);
    return {x:cx+rx*Math.cos(a),y:cy+ry*Math.sin(a)};
  });
}
function renderGraph() {
  const svg=$("graph"); svg.innerHTML="";
  const pos=nodePositions();
  const mstKeys=new Set(activeMst.map(e=>[Math.min(e.u,e.v),Math.max(e.u,e.v)].join("-")));
  edges.forEach(e=>{
    const a=pos[e.u],b=pos[e.v]; if(!a||!b)return;
    const key=[Math.min(e.u,e.v),Math.max(e.u,e.v)].join("-");
    const line=document.createElementNS(svgNS,"line");
    line.setAttribute("x1",a.x);line.setAttribute("y1",a.y);line.setAttribute("x2",b.x);line.setAttribute("y2",b.y);
    line.setAttribute("class","svg-edge"+(mstKeys.has(key)?" mst":""));svg.appendChild(line);
    const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    const label=document.createElementNS(svgNS,"text");
    label.setAttribute("x",mx);label.setAttribute("y",my-7);label.setAttribute("class","svg-edge-label");
    label.setAttribute("text-anchor","middle");label.textContent=e.weight;svg.appendChild(label);
  });
  const mstNodes=new Set(activeMst.flatMap(e=>[e.u,e.v]));
  nodes.forEach((n,i)=>{
    const p=pos[i];const circle=document.createElementNS(svgNS,"circle");
    circle.setAttribute("cx",p.x);circle.setAttribute("cy",p.y);circle.setAttribute("r",19);
    circle.setAttribute("class","svg-node"+(mstNodes.has(i)?" mst-node":""));svg.appendChild(circle);
    const label=document.createElementNS(svgNS,"text");label.setAttribute("x",p.x);label.setAttribute("y",p.y);
    label.setAttribute("class","svg-node-label");label.textContent=String.fromCharCode(65+i);svg.appendChild(label);
    const name=document.createElementNS(svgNS,"text");name.setAttribute("x",p.x);name.setAttribute("y",p.y+34);
    name.setAttribute("class","svg-node-name");name.textContent=n.name.length>18?n.name.slice(0,16)+"…":n.name;svg.appendChild(name);
  });
}
function refreshUI() {
  $("statNodes").textContent=nodes.length;$("statEdges").textContent=edges.length;
  $("nodeCountLabel").textContent=`${nodes.length} buildings`;$("edgeCountLabel").textContent=`${edges.length} links`;
  $("edgeU").innerHTML=nodes.map((n,i)=>`<option value="${i}">${String.fromCharCode(65+i)} · ${escapeHtml(n.name)}</option>`).join("");
  $("edgeV").innerHTML=nodes.map((n,i)=>`<option value="${i}" ${i===1?"selected":""}>${String.fromCharCode(65+i)} · ${escapeHtml(n.name)}</option>`).join("");
  $("edgeList").innerHTML=edges.map((e,i)=>`<div class="edge-item"><span><b>${String.fromCharCode(65+e.u)} – ${String.fromCharCode(65+e.v)}</b> &nbsp; ${escapeHtml(nodes[e.u].name)} ↔ ${escapeHtml(nodes[e.v].name)}</span><span>${e.weight} <button data-remove="${i}" title="Remove connection">×</button></span></div>`).join("") || '<div class="edge-item">No connections added yet.</div>';
  $("edgeList").querySelectorAll("[data-remove]").forEach(btn=>btn.addEventListener("click",()=>{edges.splice(Number(btn.dataset.remove),1);invalidateResults();refreshUI();}));
  renderGraph();
}
function invalidateResults() {
  outputs={prim:null,kruskal:null};activeMst=[];$("statCost").textContent="—";$("statMst").textContent="—";
  $("resultEmpty").classList.remove("hidden");$("resultContent").classList.add("hidden");
  $("resultStatus").textContent="AWAITING RUN";$("resultStatus").className="tag muted-tag";
  $("primCompare").textContent="Not run";$("kruskalCompare").textContent="Not run";
  $("compareSummary").textContent="The comparison will appear after running both algorithms.";
  $("graphNote").textContent="Run an algorithm to highlight the minimum spanning tree.";
}
function renderResult(data, algorithm) {
  outputs[algorithm]=data;activeMst=data.edges||[];
  renderGraph();$("resultEmpty").classList.add("hidden");$("resultContent").classList.remove("hidden");
  $("resultTitle").textContent=algorithm==="prim"?"Prim's algorithm results":"Kruskal's algorithm results";
  $("resultStatus").textContent=data.connected?"CONNECTED MST":"DISCONNECTED";$("resultStatus").className="tag "+(data.connected?"":"muted-tag");
  $("resultCost").textContent=data.connected?data.total_cost.toLocaleString("en-IN"):"Not possible";
  $("resultCount").textContent=data.edges.length;$("resultTime").textContent=`${Number(data.execution_ms).toFixed(4)} ms`;
  $("resultRows").innerHTML=data.edges.map(e=>`<tr><td>${String.fromCharCode(65+e.u)} · ${escapeHtml(nodes[e.u].name)}</td><td>${String.fromCharCode(65+e.v)} · ${escapeHtml(nodes[e.v].name)}</td><td>${e.weight}</td></tr>`).join("");
  $("stepsList").innerHTML=(data.steps||[]).map(s=>`<li>${escapeHtml(s)}</li>`).join("");
  $("statCost").textContent=data.connected?data.total_cost.toLocaleString("en-IN"):"—";
  $("statMst").textContent=data.connected?data.edges.length:"—";
  $("graphNote").textContent=data.connected?`${algorithm==="prim"?"Prim's":"Kruskal's"} selected ${data.edges.length} connections with total cost ${data.total_cost}.`:"The graph is disconnected. Add more connections to connect every building.";
  updateComparison();
}
function updateComparison() {
  const p=outputs.prim,k=outputs.kruskal;
  $("primCompare").textContent=p?(p.connected?`Cost: ${p.total_cost}`:"Disconnected"):"Not run";
  $("kruskalCompare").textContent=k?(k.connected?`Cost: ${k.total_cost}`:"Disconnected"):"Not run";
  if(p&&k){
    if(p.connected&&k.connected&&p.total_cost===k.total_cost){
      $("compareSummary").textContent=`Both algorithms found a minimum spanning tree with total cost ${p.total_cost}. Their selected edges may differ when multiple MSTs exist.`;
    }else if(!p.connected&&!k.connected){
      $("compareSummary").textContent="Both algorithms confirm that the current graph is disconnected; a spanning tree does not exist.";
    }else $("compareSummary").textContent="The results differ. Review the graph input and algorithm output.";
  }else $("compareSummary").textContent="Run both algorithms on the same graph to compare their minimum costs.";
}
async function runAlgorithm(algorithm) {
  const button=$(algorithm==="prim"?"runPrim":"runKruskal");
  button.disabled=true;button.textContent="Running…";
  try{
    const response=await fetch("/api/run",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({algorithm,nodes,edges})});
    const data=await response.json();
    if(!response.ok||!data.ok)throw new Error(data.error||"Could not run algorithm.");
    renderResult(data,algorithm);
    if(!data.connected)toast("Network is disconnected. Add connections between all components.");
    else toast(`${algorithm==="prim"?"Prim's":"Kruskal's"} algorithm completed successfully.`);
  }catch(err){toast(err.message);console.error(err);}
  finally{button.disabled=false;button.innerHTML=algorithm==="prim"?"Run Prim's algorithm <span>→</span>":"Run Kruskal's algorithm <span>→</span>";}
}
$("addNodeBtn").addEventListener("click",()=>{
  const name=$("nodeName").value.trim();
  if(!name)return toast("Enter a building name.");
  if(nodes.length>=100)return toast("Maximum of 100 buildings reached.");
  if(nodes.some(n=>n.name.toLowerCase()===name.toLowerCase()))return toast("That building name already exists.");
  nodes.push({name});$("nodeName").value="";invalidateResults();refreshUI();toast("Building added.");
});
$("nodeName").addEventListener("keydown",e=>{if(e.key==="Enter")$("addNodeBtn").click();});
$("addEdgeBtn").addEventListener("click",()=>{
  const u=Number($("edgeU").value),v=Number($("edgeV").value),w=Number($("edgeWeight").value);
  if(!Number.isInteger(u)||!Number.isInteger(v)||u===v)return toast("Choose two different buildings.");
  if($("edgeWeight").value===""||!Number.isInteger(w)||w<0||w>100000000)return toast("Enter a whole-number cost from 0 to 100,000,000.");
  if(edges.some(e=>(e.u===u&&e.v===v)||(e.u===v&&e.v===u)))return toast("A connection between these buildings already exists.");
  edges.push({u,v,weight:w});$("edgeWeight").value="";invalidateResults();refreshUI();toast("Power-line connection added.");
});
$("resetBtn").addEventListener("click",()=>{nodes=structuredClone(sampleNodes);edges=structuredClone(sampleEdges);invalidateResults();refreshUI();toast("Sample network restored.");});
$("runPrim").addEventListener("click",()=>runAlgorithm("prim"));
$("runKruskal").addEventListener("click",()=>runAlgorithm("kruskal"));
refreshUI();
