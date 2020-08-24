function solve(){
   
   let $table = document.getElementsByTagName("tbody")[0];

   $table.addEventListener("click", handler);

   function handler(e) {

   let currentElement = e.target.parentNode;

   if (currentElement.style.cssText === "background: rgb(65, 63, 94);") {

      currentElement.style.background='';
      return
   }

   let nonClickedElements =Array.from($table.children).filter((e)=> e!==currentElement);
   let highlightedElement = nonClickedElements.find((e)=>e.style.background === "rgb(65, 63, 94)")

   if (highlightedElement!==undefined) {
      highlightedElement.style.background='';
   }

   currentElement.style.background = "rgb(65, 63, 94)";

   }
}