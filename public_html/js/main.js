$(function () {
	// ------------------- Configurações iniciais do mapa -------------------

	var center =	{lat: -22.8945392212668, lng: -43.24852347182288}	

	map = new google.maps.Map(document.getElementById('mapa'), {
		mapTypeControl:false,
		center: center,
		zoom:12
		//mapTypeId: 'satellite'
	});
	
	/* 	kmlLayer = new google.maps.KmlLayer('CAMINHO_PARA_KML', {
		preserveViewport: true,
		map: map
	}) */

	//Download simultâneo das informações de hospitais e suas coordenadas geográficas
	Promise.all([$.get('/hospitais.json'), $.get('/pedidos')])
	.then(function(result){
		var hospitais = result[0]
		var pedidos = result[1]
	
		pedidos = pedidos
			.filter(function(pedido){
				//ignora as linhas da tabela que não possuem dados
				return /[:]/.test(pedido[1])
			})

			//organiza as informações
			.map(function(pedido){					
				var hospital =	pedido[3]
				var tipo =		pedido[4]
				var privado =	(tipo == "Privado")
				var qtd =		pedido[7]
				var tel =		pedido[8]
				var contato =	pedido[9]

				if(!hospitais[hospital]) return 

				var info =	'<div id="content">'+
							'<div id="siteNotice">'+
							'</div>'+
							'<h1 id="firstHeading" class="firstHeading">'+ hospital +'</h1>'+
							'<div id="bodyContent">'+
							'<p><b>Necessidade de Máscaras:</b> '+qtd+'</p>'+
							'<p><b>Telefone para contato:</b> '+tel+'</p>'+
							'<p><b>Solicitante:</b> '+contato+'</p>'+
							'</div>'+
							'</div>';

				var infowindow = new google.maps.InfoWindow({
					content: info
				});

				var mkOptions = {
					position: hospitais[hospital].coords,
					map: map
				}

				if(privado) mkOptions.icon='/img/yellow.png'

				var mk = new google.maps.Marker(mkOptions);

				//Informações do marcador serão exibidas ao passar o cursor por cima
				mk.addListener('mouseover', function() {
					infowindow.open(map, mk);
				});

				mk.addListener('mouseout', function() {
					infowindow.close(map, mk);
				});

			});

	})
});

