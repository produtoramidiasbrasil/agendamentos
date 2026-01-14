// Speech time calculator
const announcerText = document.getElementById('announcerText');
const speechTimeDisplay = document.getElementById('speechTime');

announcerText.addEventListener('input', function() {
	const text = this.value.trim();
	const words = text.split(/\s+/).filter(word => word.length > 0);
	const wordCount = words.length;
    
	const avgWordsPerMinute = 140;
	const seconds = Math.round((wordCount / avgWordsPerMinute) * 60);
    
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
    
	let timeString = '';
	if (minutes > 0) {
		timeString = `${minutes} minuto${minutes > 1 ? 's' : ''}`;
		if (remainingSeconds > 0) {
			timeString += ` e ${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''}`;
		}
	} else {
		timeString = `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
	}
    
	speechTimeDisplay.textContent = timeString || '0 segundos';
	});

	// Set initial displayed speech time on load
	if (announcerText) {
		announcerText.dispatchEvent(new Event('input'));
	}

// (Removed logo upload handler — feature removed per request)

// WhatsApp sender
const sendWhatsAppBtn = document.getElementById('sendWhatsApp');
const form = document.getElementById('commercialForm');

sendWhatsAppBtn.addEventListener('click', function(e) {
	e.preventDefault();
    
	if (!form.checkValidity()) {
		form.reportValidity();
		return;
	}
    
	const formData = {
		companyName: document.getElementById('companyName').value,
		clientName: document.getElementById('clientName').value,
		clientWhatsApp: document.getElementById('clientWhatsApp').value,
		commercialTheme: document.getElementById('commercialTheme').value,
		eventStart: document.getElementById('eventStart')?.value || '',
		eventEnd: document.getElementById('eventEnd')?.value || '',
		projectColors: document.getElementById('projectColors').value,
		announcerText: document.getElementById('announcerText').value,
		announcerName: document.getElementById('announcerName').value,
		commercialModel: document.getElementById('commercialModel')?.selectedOptions[0]?.textContent || ''
	};
    
	const message = `*NOVA AGENDA & ORÇAMENTOS*\n\n` +
		`*Empresa:* ${formData.companyName}\n` +
		`*Cliente:* ${formData.clientName}\n` +
		`*WhatsApp:* ${formData.clientWhatsApp}\n` +
		`*Tema:* ${formData.commercialTheme}\n` +
		`*Modelo:* ${formData.commercialModel}\n` +
		`*Data Inicial:* ${formData.eventStart}\n` +
		`*Data Término:* ${formData.eventEnd}\n` +
		`*Cores:* ${formData.projectColors}\n\n` +
		`*Texto do Locutor:* ${formData.announcerText}\n\n` +
		`*Locutor:* ${formData.announcerName}\n\n` +
		`*Observação:* Te enviaremos a data de entrega e valores via WhatsApp`;
    
	const phoneNumber = '5562991620784';
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
	window.open(whatsappUrl, '_blank');
});

// Select announcer on click
const announcerList = document.getElementById('announcerList');
const announcerNameInput = document.getElementById('announcerName');

announcerList.addEventListener('click', function(e) {
	// If the click originated inside an <audio> element, ignore it
	if (e.target.closest('audio')) return;

	const audioPlayer = e.target.closest('.audio-player');
	if (audioPlayer) {
		const name = audioPlayer.querySelector('h3').textContent.trim();
		announcerNameInput.value = name;

		document.querySelectorAll('.audio-player').forEach(p => {
			p.classList.remove('ring-2', 'ring-purple-500');
		});
		audioPlayer.classList.add('ring-2', 'ring-purple-500');
	}
});

// Ensure clicks on the audio element don't bubble to parent handlers (extra safety)
document.querySelectorAll('#announcerList audio').forEach(a => {
	a.addEventListener('pointerdown', function(e) { e.stopPropagation(); }, {passive: true});
	a.addEventListener('click', function(e) { e.stopPropagation(); });
});

// Min date = today and ensure end >= start
const eventStartInput = document.getElementById('eventStart');
const eventEndInput = document.getElementById('eventEnd');
const todayISO = new Date().toISOString().split('T')[0];
if (eventStartInput) {
	eventStartInput.min = todayISO;
}
if (eventEndInput) {
	eventEndInput.min = todayISO;
}

// when start changes, set min for end
if (eventStartInput && eventEndInput) {
	eventStartInput.addEventListener('change', function() {
		const start = this.value;
		if (start) {
			eventEndInput.min = start;
			if (eventEndInput.value && eventEndInput.value < start) {
				eventEndInput.value = start;
			}
		} else {
			eventEndInput.min = todayISO;
		}
	});
}
