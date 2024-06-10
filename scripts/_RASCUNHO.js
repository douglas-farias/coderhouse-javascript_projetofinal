

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTfmS9NX4L8tw-XLGlwDibbtMqNiRQTPY&libraries=places"></script>

function calcularDistancia(origem, destino) {
    // Crie um serviço Distance Matrix
    var service = new google.maps.DistanceMatrixService();
  
    // Defina as origens e destinos como arrays de strings
    var origens = [origem];
    var destinos = [destino];
  
    // Opcional: defina o modo de transporte (dirigir, andar de bicicleta, etc.)
    var modoDeTransporte = google.maps.TravelMode.DRIVING;
  
    // Execute a solicitação
    service.distanceMatrix({
      origins: origens,
      destinations: destinos,
      travelMode: modoDeTransporte
    }, function(resposta, status) {
      if (status === 'OK') {
        // Obtenha a distância em metros
        var distanciaEmMetros = resposta.rows[0].elements[0].distance.value;
  
        // Converta para quilômetros (opcional)
        var distanciaEmKm = distanciaEmMetros / 1000;
  
        // Exiba a distância
        console.log("Distância: " + distanciaEmKm + " km");
      } else {
        console.error("Erro na solicitação da Distance Matrix: " + status);
      }
    });
  }
  
  // Exemplo de uso
  var origem = "Praça da Sé, São Paulo, SP";
  var destino = "Avenida Paulista, 900, São Paulo, SP";
  
  calcularDistancia(origem, destino);
  
