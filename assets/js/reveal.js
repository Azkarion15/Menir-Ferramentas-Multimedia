/**
 * Menir — scroll-reveal.
 *
 * The .js-reveal flag (added in <head> before first paint) switches the reveal
 * CSS on. This script reveals each top-level section (.wp-block-post-content > *)
 * the first time it intersects the viewport — whether it scrolls in or is
 * already on screen when the visitor arrives — then stops watching it.
 * Reduced-motion is handled entirely in CSS (everything stays visible).
 */
(function () {
	if (!('IntersectionObserver' in window)) {
		return;
	}

	var items = document.querySelectorAll('.wp-block-post-content > *');

	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				io.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0
	});

	[].forEach.call(items, function (el) {
		io.observe(el);
	});
})();
