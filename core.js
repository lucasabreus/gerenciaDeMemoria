function Processo (value, value2) {
    this.nome = value;
    this.tamanho = value2;
}

vetor = new Array();

function inicializa(){
	vetor[0] = new Processo("A",5);
	vetor[1] = new Processo("B",7);
	vetor[2] = new Processo("C",3);
	vetor[3] = new Processo("D",4);
	vetor[4] = new Processo("E",1);

	var processos = "";
	for(i=0;i<vetor.length;i++){
		var palavra = "<div class='chip'>" + vetor[i].nome + " - " + vetor[i].tamanho + " </div>";
		processos += palavra;
	}
	
	document.getElementById('processos').innerHTML = processos;
}

function preencher(){
	var fragFirst = 0;
	for(i=0;i<5;i++){
		var espaco = vetor[i].tamanho;
		var nome = vetor[i].nome;
		for(j=0;j<5;j++){
			var x = document.getElementById("firstFit").rows[j].cells;
			var espacoCelula = x[1].innerHTML;
			if ( espaco <= espacoCelula ){
				if ( x[0].innerHTML == "vazio"){
					x[0].innerHTML = nome + "(" + espaco + ")";
					x[2].innerHTML = espacoCelula - espaco;
					fragFirst += espacoCelula - espaco;
					break;
				}
			}
		}
	}
	document.getElementById("firstVazio").innerHTML = "FRAGMENTAÇÃO INTERNA: " + fragFirst;

	var fragBest = 0;
	for(i=0;i<5;i++){
		var espaco = vetor[i].tamanho;
		var nome = vetor[i].nome;
		
		var melhor = 123123;
		var indice = -1;
		
		for(j=0;j<5;j++){
			var x = document.getElementById("bestFit").rows[j].cells;
			var espacoCelula = x[1].innerHTML;
			if ( espaco <= espacoCelula ){
				if ( x[0].innerHTML == "vazio" ){
					if ( espacoCelula - espaco < melhor ){
						melhor = espacoCelula - espaco;
						indice = j;
					}
				}
			}
		}

		if ( indice != -1 ){
			var x = document.getElementById("bestFit").rows[indice].cells;
			var espacoCelula = x[1].innerHTML;
			x[0].innerHTML = nome + "(" + espaco + ")";
			x[2].innerHTML = espacoCelula - espaco;
			fragBest += espacoCelula - espaco;
		}
	}
	document.getElementById("bestVazio").innerHTML = "FRAGMENTAÇÃO INTERNA: " + fragBest;

	var fragWorst = 0;
	for(i=0;i<5;i++){
		var espaco = vetor[i].tamanho;
		var nome = vetor[i].nome;
		
		var melhor = -1;
		var indice = -1;
		
		for(j=0;j<5;j++){
			var x = document.getElementById("worstFit").rows[j].cells;
			var espacoCelula = x[1].innerHTML;
			if ( espaco <= espacoCelula ){
				if ( x[0].innerHTML == "vazio" ){
					if ( espacoCelula - espaco > melhor ){
						melhor = espacoCelula - espaco;
						indice = j;
					}
				}
			}
		}

		if ( indice != -1 ){
			var x = document.getElementById("worstFit").rows[indice].cells;
			var espacoCelula = x[1].innerHTML;
			x[0].innerHTML = nome + "(" + espaco + ")";
			x[2].innerHTML = espacoCelula - espaco;
			fragWorst += espacoCelula - espaco;
		}
	}
	document.getElementById("worstVazio").innerHTML = "FRAGMENTAÇÃO INTERNA: " + fragWorst;

	var fragNext = 0;
	var indice = 0;
	for(i=0;i<5;i++){
		var espaco = vetor[i].tamanho;
		var nome = vetor[i].nome;

		for(j=indice;j<indice+5;j++){
			var x = document.getElementById("nextFit").rows[j].cells;
			var espacoCelula = x[1].innerHTML;
			if ( espaco <= espacoCelula ){
				if ( x[0].innerHTML == "vazio"){
					x[0].innerHTML = nome + "(" + espaco + ")";
					x[2].innerHTML = espacoCelula - espaco;
					fragNext += espacoCelula - espaco;
					indice = j;
					break;
				}
			}
			if ( indice == 5 ) indice = 0;
		}
	}
	document.getElementById("nextVazio").innerHTML = "FRAGMENTAÇÃO INTERNA: " + fragNext;
}

function zerar() { 
    tabelas = new Array();
    tabelas[0] = "firstFit";
    tabelas[1] = "bestFit";
    tabelas[2] = "nextFit";
    tabelas[3] = "worstFit";

    aleatorios = new Array();
    for(i=0;i<5;i++){
    	aleatorios[i] = Math.floor((Math.random() * 10) + 1);
    }

    for(j=0;j<4;j++){
    	var table = document.getElementById(tabelas[j]);
    	if ( table.rows.length >= 5 ){
    		for(i=0;i<5;i++){
		    	var row = table.deleteRow(0);
			}
    	}
	    for(i=0;i<5;i++){
	    	var row = table.insertRow(0);
		    var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    cell1.innerHTML = "vazio";
		    cell2.innerHTML = aleatorios[i];
		    cell3.innerHTML = 0;
		}
	}
}