
(function($){
	$.fn.makeScroll = function(){

		var $obj = this;
		var $bgobj = $(this);
		var posScroll;
		var hgtObj = [];
		var $speed = [];
		var pos = [];
		var posObj = [];
		var $cetObj = [];
		var	$filhos;
		var total = [];
		

		function inicio(){
			$filhos = $obj.find("[data-speed]");
				$filhos.each(function(i) {
					// MUDA Z-INDEX DOS ELEMENTOS
					if(i%2 == 0){
						$index = $filhos.length-i;
						$(this).css("z-index", $index);
						$(this).next().css("z-index", $index)
					}
					// IDENTIFICA ELEMENTOS ATIVOS
					if(i < 2){
						$(this).attr({'atv':true})
					}
					// IDENTIFICA ELEMENTOS INATIVOS
					else {
						$(this).attr({'atv':false})
					}
			});
			verificaSection();
			defineCentro();
			seiLaScroll();
			$(window).bind("scroll", dirScroll);
			posOriginal();
		}
		function tamanhoBody(){
			$filhos = $obj.find("[data-speed]");
				$filhos.each(function(i) {
					$tmn = parseFloat($filhos.css("height"))*(parseFloat($filhos.length));
					$("body").css("height", $tmn);
				});
		}
		
		function defineCentro(){
			$('[atv=true]').each(function(i){
				$cetObj[i] = $(this).css("top");
			});
		}
		// PASSA ATRIBUTOS PARA ELEMENTOS
		function verificaSection(){
			posScroll = $(window).scrollTop();
			$('[atv=true]').each(function(i){
				$(this).css("display", "block");
				pos[i] = $(this).css("top");
				hgtObj[i] = $(this).css("height");
				$speed[i] = $(this).data('speed');
			}); 
		}

		function seiLaScroll() {
			$(window).scroll(function(){
				$aNext = false;
				$aPrev = false;
				$('[atv=true]').each(function(i){

					// SOMA VALOR DE POSIÇÃO DO SCROLL
					var vel = ($(window).scrollTop() - posScroll) * $speed[i];
					total = parseFloat(pos[i]) + vel;
					
					
					// VALOR CERTO
					total = parseInt(total) + 'px';
					$(this).css("top", total);

					if(i%2 == 0){
						if(parseFloat(total) >= parseFloat($cetObj[i])){
							$(this).css("top", $cetObj[i]);
							$aNext = false;
							$aPrev = true;
						}
					}
					else{
						if(parseFloat(total) <= parseFloat($cetObj[i])){
							$(this).css("top", $cetObj[i]);
							$aNext = false;
							$aPrev = true;
						}
					}

					// TRACE -TESTES
					// $("#texto").text(vel + "   " + total + "   " + $(this).css("top"));

				});
				if($aNext){
					chamaNext();
				}
				else if($aPrev){
					chamaPrev();
				}
			});
		}

			function dirScroll(){
				$('[atv=true]').each(function(i){
						if(parseFloat(total) >= (parseFloat(hgtObj) * 2)){
							$aNext = true;
							$aPrev = false;
						}
						else if(parseFloat(total) <= (-parseFloat(hgtObj))){
							$aNext = true;
							$aPrev = false;
						}
				});
				if($aNext){
					chamaNext();
				}
				else if($aPrev){
					chamaPrev();
				}
			}
		function posOriginal(){
			$(window).scroll(function(){
				$filhos.each(function(i) {
					if(i < 2){
						if($(this).attr("atv") == "true"){
							if($(window).scrollTop() == 0 && $(this).css("top") != $cetObj[i]){
								$(this).animate({"top": $cetObj[i]}, "slow", function(){
					                $(this).css("top", $cetObj[i]);
									verificaSection();
					            });
							}
						}
					}
				});
			});
		}

		function chamaNext(){
			$('[atv=true]').each(function(i){
				if($(this).next().next().attr('class')!=undefined){
					$(this).attr({'atv':false});
					$(this).next().next().attr({'atv':true});
					verificaSection();
				}
			});
			$filhos.each(function(i) {
				if($(this).attr("atv") == "true"){
					if(i > $filhos.length-2){
						// alert("unbind dirScroll")
						$(window).unbind("scroll", dirScroll)
					}
				}
			});
		}
		function chamaPrev(){
			$('[atv=true]').each(function(i){
				if($(this).prev().prev().attr('class')!=undefined){
					$(this).attr({'atv':false});
					$(this).prev().prev().attr({'atv':true});
					verificaSection();
				}
			});
			$filhos.each(function(i) {
				if($(this).attr("atv") == "true"){
					if(i > $filhos.length-4){
						// alert("unbind dirScroll")
						$(window).bind("scroll", dirScroll)
					}
				}
			});
		}
		inicio();
		tamanhoBody();
	}
})(jQuery);