$(document).ready(function() {
    $('#search-form').submit(function(event) {
        event.preventDefault();
        let heroId = $('#hero-input').val().trim();

        // Validar que se ingresó un número
        if (!/^\d+$/.test(heroId)) {
            alert('Por favor, ingresa solo números para buscar un SuperHéroe.');
            return;
        }

        // Realizar la consulta a la API de SuperHero
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${heroId}`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.response === "success") {
                    // Mostrar la información del héroe en tarjetas
                    displayHeroInfo(response);
                    alert('Si ve esto es porque la API respondió correctamente');
                } else {
                    alert('No se encontró ningún SuperHéroe con ese número. Por favor, intenta nuevamente.');
                }
            },
            error: function() {
                alert('Ocurrió un error al consultar la API. Por favor, inténtalo nuevamente más tarde.');
            }
        });
    });

    function displayHeroInfo(hero) {
        let heroData = hero;
        let powerstats = [
            { label: "Inteligencia", y: parseInt(heroData.powerstats.intelligence) || 0 },
            { label: "Fuerza", y: parseInt(heroData.powerstats.strength) || 0 },
            { label: "Velocidad", y: parseInt(heroData.powerstats.speed) || 0 },
            { label: "Resistencia", y: parseInt(heroData.powerstats.durability) || 0 },
            { label: "Poder", y: parseInt(heroData.powerstats.power) || 0 },
            { label: "Combate", y: parseInt(heroData.powerstats.combat) || 0 }
        ];

        let resultsSection = $('#results-section');
        resultsSection.empty();
    
        let card = `
            <div class="card">
                <div class="card-body">
                    <div><img src="${heroData.image.url}"></div>
                    <div>
                        <h5 class="card-title">${heroData.name}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Conexiones: ${heroData.connections['group-affiliation']}</li>
                            <li class="list-group-item">Publicado por: ${heroData.biography.publisher}</li>
                            <li class="list-group-item">Ocupación: ${heroData.work.occupation}</li>
                            <li class="list-group-item">Primera aparición: ${heroData.biography['first-appearance']}</li>
                            <li class="list-group-item">Altura: ${heroData.appearance.height[1]}</li>
                            <li class="list-group-item">Peso: ${heroData.appearance.weight[1]}</li>
                            <li class="list-group-item">Alias: ${heroData.biography.aliases.join(', ')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        resultsSection.append(card);
    
       let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: `Powerstats de ${heroData.name}`
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: powerstats.map(stat => ({ label: stat.label, y: stat.y }))
            }]
        });
        chart.render();
    
        
    }
    
});
