export async function textContrast(locator) {
  return locator.evaluate(element => {
    const context=document.createElement('canvas').getContext('2d');
    const rgba=color=>{context.clearRect(0,0,1,1);context.fillStyle=color;context.fillRect(0,0,1,1);return [...context.getImageData(0,0,1,1).data];};
    const foreground=rgba(getComputedStyle(element).color);
    let background;
    for(let node=element;node;node=node.parentElement) {
      const color=rgba(getComputedStyle(node).backgroundColor);
      if(color[3]===255){background=color;break;}
    }
    if(!background || foreground[3]!==255)throw new Error('Contrast requires opaque text and a solid effective surface.');
    const luminance=color=>color.slice(0,3).map(value=>{const channel=value/255;return channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4;}).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
    const a=luminance(foreground),b=luminance(background);
    return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  });
}
