$(document).ready(()=>{

    $("form").submit((event)=>{
    
     event.preventDefault()
    
      let valueInput = $("#pokemonInput").val();
    
       $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,
            success:(data)=>{
                let nombre  = data.name;
                let imagen = data.sprites.front_default;
                let peso = data.weight;
            
                $("#pokeInfo").html(`   
                <div class="text-center">
                 <h3> ${nombre} </h3>
                  <img src="${imagen}" alt="">
                     <h6>Peso:${peso}</h6>
                </div>`);
    
                let detalle =[];
                data.stats.forEach((s)=>{
                        detalle.push({
                          label:s.stat.name, 
                          y:s.base_stat});
                });
    
                let config={
                        animationEnabled:true,
                        title:{
                            text:"estadisticas"
                        },
                        axisY:{
                            title :"valor"
                        },
                        axisX:
                            {title:"Estadistica"
                        },
                        data:[ {type:"column",
                            dataPoints:detalle
                         },
                     ]  ,   
                    }   ;       
                
                    let chart = new CanvasJS.Chart("pokeStats",config);
    
                chart.render()
    
    
                },
           });
        });
     });
    