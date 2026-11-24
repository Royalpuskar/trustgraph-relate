// In-memory reference traversal, not a Relate database integration.
export function impact(edges,start){
 if(!Array.isArray(edges)||edges.length>10000||typeof start!=='string'||!start)throw new TypeError('Invalid graph');
 const reverse=new Map();
 for(const edge of edges){
  if(!Array.isArray(edge)||edge.length!==2||edge.some(x=>typeof x!=='string'||!x))throw new TypeError('Invalid dependency');
  const [dependent,dependency]=edge;
  if(!reverse.has(dependency))reverse.set(dependency,new Set());
  reverse.get(dependency).add(dependent);
 }
 const seen=new Set([start]),queue=[{id:start,path:[start]}],result=[];
 for(let i=0;i<queue.length;i++){
  const current=queue[i];
  for(const next of reverse.get(current.id)??[]){
   if(seen.has(next))continue;
   seen.add(next);const entry={id:next,path:[...current.path,next]};queue.push(entry);result.push(entry);
  }
 }
 return result;
}
