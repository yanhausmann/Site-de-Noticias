/* ==========================================================================
   Notícias Cidade — interações progressivas
   Sem dependências. O site continua funcionando com o JavaScript desativado.
   ========================================================================== */
(function () {
	'use strict';

	/* ----------------------------------------------------------------------
	   Ano do rodapé
	   ---------------------------------------------------------------------- */
	var ano = document.querySelector('[data-ano]');
	if (ano) {
		ano.textContent = new Date().getFullYear();
	}

	/* ----------------------------------------------------------------------
	   Newsletter (demonstração, sem envio para servidor)
	   ---------------------------------------------------------------------- */
	var form = document.querySelector('[data-newsletter]');

	if (form) {
		var email = form.querySelector('input[type="email"]');
		var mensagem = form.querySelector('[data-mensagem]');

		var mostrarMensagem = function (texto, erro) {
			if (!mensagem) {
				return;
			}
			mensagem.textContent = texto;
			mensagem.classList.toggle('erro', Boolean(erro));
			mensagem.classList.add('visivel');
		};

		form.addEventListener('submit', function (evento) {
			evento.preventDefault();

			if (!email || !email.value.trim()) {
				if (email) {
					email.setAttribute('aria-invalid', 'true');
					email.focus();
				}
				mostrarMensagem('Digite um e-mail para receber a newsletter.', true);
				return;
			}

			if (!email.checkValidity()) {
				email.setAttribute('aria-invalid', 'true');
				email.focus();
				mostrarMensagem('Esse e-mail não parece válido. Confira e tente novamente.', true);
				return;
			}

			email.removeAttribute('aria-invalid');
			mostrarMensagem('Cadastro confirmado! Esta é uma demonstração: nenhum e-mail foi enviado.', false);
			form.reset();
		});

		if (email) {
			email.addEventListener('invalid', function () {
				email.setAttribute('aria-invalid', 'true');
				mostrarMensagem('Digite um e-mail válido para receber a newsletter.', true);
			});

			email.addEventListener('input', function () {
				if (email.checkValidity()) {
					email.removeAttribute('aria-invalid');
					if (mensagem) {
						mensagem.classList.remove('visivel');
					}
				}
			});
		}
	}

	/* ----------------------------------------------------------------------
	   Galeria: filtros
	   ---------------------------------------------------------------------- */
	var botoesFiltro = Array.prototype.slice.call(document.querySelectorAll('[data-filtro]'));
	var fotosGaleria = Array.prototype.slice.call(document.querySelectorAll('[data-categoria]'));
	var contagem = document.querySelector('[data-contagem]');

	var atualizarContagem = function () {
		if (!contagem) {
			return;
		}
		var visiveis = fotosGaleria.filter(function (foto) {
			return !foto.hidden;
		}).length;
		contagem.textContent = visiveis === 1 ? '1 foto' : visiveis + ' fotos';
	};

	botoesFiltro.forEach(function (botao) {
		botao.addEventListener('click', function () {
			var filtro = botao.getAttribute('data-filtro');

			botoesFiltro.forEach(function (outro) {
				outro.setAttribute('aria-pressed', String(outro === botao));
			});

			fotosGaleria.forEach(function (foto) {
				var combina = filtro === 'todas' || foto.getAttribute('data-categoria') === filtro;
				foto.hidden = !combina;
			});

			atualizarContagem();
		});
	});

	atualizarContagem();

	/* ----------------------------------------------------------------------
	   Galeria: lightbox
	   ---------------------------------------------------------------------- */
	var lightbox = document.getElementById('lightbox');

	if (lightbox && typeof lightbox.showModal === 'function') {
		var imagem = lightbox.querySelector('[data-lightbox-imagem]');
		var titulo = lightbox.querySelector('[data-lightbox-titulo]');
		var credito = lightbox.querySelector('[data-lightbox-credito]');
		var botaoFechar = lightbox.querySelector('[data-fechar]');
		var botaoAnterior = lightbox.querySelector('[data-anterior]');
		var botaoProxima = lightbox.querySelector('[data-proxima]');
		var indiceAtual = 0;

		var linksVisiveis = function () {
			return Array.prototype.slice
				.call(document.querySelectorAll('[data-foto]'))
				.filter(function (link) {
					var figura = link.closest('[data-categoria]');
					return !figura || !figura.hidden;
				});
		};

		var abrirFoto = function (link, indice) {
			var links = linksVisiveis();
			indiceAtual = typeof indice === 'number' ? indice : links.indexOf(link);

			if (!imagem || !link) {
				return;
			}

			imagem.src = link.getAttribute('href');
			imagem.alt = link.getAttribute('data-alt') || '';
			if (titulo) {
				titulo.textContent = link.getAttribute('data-titulo') || '';
			}
			if (credito) {
				credito.textContent = link.getAttribute('data-credito') || '';
			}

			if (!lightbox.open) {
				lightbox.showModal();
			}
		};

		var navegar = function (passo) {
			var links = linksVisiveis();
			if (!links.length) {
				return;
			}
			indiceAtual = (indiceAtual + passo + links.length) % links.length;
			abrirFoto(links[indiceAtual], indiceAtual);
		};

		document.querySelectorAll('[data-foto]').forEach(function (link) {
			link.addEventListener('click', function (evento) {
				if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) {
					return;
				}
				evento.preventDefault();
				abrirFoto(link, linksVisiveis().indexOf(link));
			});
		});

		if (botaoFechar) {
			botaoFechar.addEventListener('click', function () {
				lightbox.close();
			});
		}

		if (botaoAnterior) {
			botaoAnterior.addEventListener('click', function () {
				navegar(-1);
			});
		}

		if (botaoProxima) {
			botaoProxima.addEventListener('click', function () {
				navegar(1);
			});
		}

		lightbox.addEventListener('click', function (evento) {
			if (evento.target === lightbox) {
				lightbox.close();
			}
		});

		lightbox.addEventListener('keydown', function (evento) {
			if (evento.key === 'ArrowLeft') {
				evento.preventDefault();
				navegar(-1);
			}
			if (evento.key === 'ArrowRight') {
				evento.preventDefault();
				navegar(1);
			}
		});

		lightbox.addEventListener('close', function () {
			if (imagem) {
				imagem.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
			}
		});
	}
})();
