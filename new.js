async function loadInToTable(url , table) {
    //let data;
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");

  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log(data);
//    data.forEach((e)=> {
//       console.log("array elements",e);
//    })

//   const res = Object.keys(data[0]); // Tight-coupled
//   console.log(res);

  
  //clear table
   tableHead.innerHTML = "<tr></tr>";
   tableBody.innerHTML = "";

   //populate
    var tArr = [];
    var res = [];
    data.forEach((e)=> {
      tArr = Object.keys(e);
      tArr.forEach((ele)=>{
          if(res.includes(ele) != true) {
               res.push(ele);
          };
      });
    });
    console.log(res);
    

   for(const headerText of res) {
       const headerElement = document.createElement("th");
       
       headerElement.textContent = headerText;
       tableHead.querySelector("tr").appendChild(headerElement);
   };


    data.forEach((element) =>{
      var rowElement = document.createElement("tr");
      let eleValues = Object.values(element);
      let eleKeys = Object.keys(element);
      for(let i = 0; i<res.length ; i++) {
       var temp = eleKeys.find((ele) => res[i] === ele);
       var ind = eleKeys.indexOf(temp);
       if(ind != -1) {
       var cellElement = document.createElement("td")
       cellElement.textContent = eleValues[ind];
       rowElement.appendChild(cellElement);
       }
       else {
         var cellElement = document.createElement("td");
         cellElement.textContent = "";
         rowElement.appendChild(cellElement);
       }
      };
      tableBody.appendChild(rowElement);
    });
};

loadInToTable("https://jsonplaceholder.typicode.com/posts/1/comments" , document.querySelector("table")); 