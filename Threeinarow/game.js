
(function(){
    //fetch("https://www.mikecaines.com/3inarow/puzzle.php")
    fetch("https://www.mikecaines.com/3inarow/sample.json")
   .then(function(response){return response.json()})
   .then(function(json){
   
           console.log(json);
           displayApplication(json);
        });

       
 function displayApplication(jsonArray)
        {
            var l = document.getElementById("theGame");
        
            var table  = document.createElement('table');
            
            l.appendChild(table);

            for(var i=0; i < jsonArray.rows.length; i++)
            {
				var tr=document.createElement('tr');
				//add DOM element
                table.appendChild(tr);  
				for(var j=0; j < jsonArray.rows[i].length; j++){
					var td=document.createElement('td');
					//add class to table
					td.className=`state${jsonArray.rows[i][j].currentState}`;

					if(jsonArray.rows[i][j].canToggle)
					{
						td.addEventListener("click", function(){
							var i=this.parentNode.rowIndex;
							var j=this.cellIndex;
							if (this.className=="state0")
							{
								this.className="state1";
								jsonArray.rows[i][j].currentState=1;
							}
							else if (this.className=="state1")
							{
								this.className="state2";
								jsonArray.rows[i][j].currentState=2;
							}
							else
							{
								this.className="state0";
								jsonArray.rows[i][j].currentState=0;
							}
							//console.log(`(${i},${j}) - ${this.className}`);

							//console.log(jsonArray)
						});
					}
					//add DOM elemnt
					tr.appendChild(td);
                }
            }   
			var button=document.createElement("input");
			var p = document.createElement("P");
			var text = document.createTextNode("game");
			button.type = "button";
			button.value = "Check Puzzle";
			button.addEventListener("click", function(){
				var state = "You did it!!";
				//this.appendChild = document.getElementById("state");
				for(var i=0; i < jsonArray.rows.length; i++)
				{
					if (state == "Something is wrong")
					{
						break;
					}
					for(var j=0; j < jsonArray.rows[i].length; j++)
					{
						if(jsonArray.rows[i][j].correctState != jsonArray.rows[i][j].currentState)
						{
							if (jsonArray.rows[i][j].currentState != 0)
							{
								state = "Something is wrong";
								break
							}
							state = "So far so good";
						}
					}
				}
				//alert(state);
				text.textContent=state;
			});
			l.appendChild(button);
			p.appendChild(text);
			l.appendChild(p);
        };  
   })();

//https://stackoverflow.com/questions/46341171/how-to-addeventlistener-to-table-cells
//https://stackoverflow.com/questions/8722680/changing-style-elements-based-on-cell-contents
//https://www.youtube.com/watch?v=PU3Vz1O1jOU&t=416s



















//    function myClick() { 
//    console.log("onclick");
// }

