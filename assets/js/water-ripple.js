/**
 * Click water-ripple (Menir / Midnight)
 * Progressive enhancement: no .js-ripple flag on <html> = no effect at all.
 * The flag is set only when IntersectionObserver is available and the visitor
 * has NOT requested reduced motion, so this never runs for them.
 */
(function () {
	if (!document.documentElement.classList.contains('js-ripple')) {
		return;
	}

	var wrap = document.createElement('div');
	wrap.className = 'menir-ripples';
	wrap.setAttribute('aria-hidden', 'true');
	document.body.appendChild(wrap);

	function spawn(clientX, clientY) {
		var size = 120; // small local ripple around the click point
		var RINGS = 2; // staggered concentric rings = a water ripple
		for (var i = 0; i < RINGS; i++) {
			var ring = document.createElement('span');
			ring.className = 'menir-ripple';
			ring.style.left = clientX + 'px';
			ring.style.top = clientY + 'px';
			ring.style.width = size + 'px';
			ring.style.height = size + 'px';
			ring.style.animationDelay = (i * 0.16) + 's';
			wrap.appendChild(ring);
			(function (r) {
				// Apply the initial (scaled-to-0) state first, then run the animation.
				requestAnimationFrame(function () {
					r.classList.add('is-on');
				});
				r.addEventListener('animationend', function () {
					if (r.parentNode) {
						r.parentNode.removeChild(r);
					}
				});
			})(ring);
		}
	}

	document.addEventListener('click', function (e) {
		spawn(e.clientX, e.clientY);
	}, { passive: true });
})();
