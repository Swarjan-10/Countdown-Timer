window.onload = function() {
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');
    const startInput = document.getElementById('start-input');

    let countdown;
    let startTime;

    startButton.addEventListener('click', function() {
        const startValue = new Date(startInput.value).getTime();
        
        if (!isNaN(startValue)) {
            startTime = startValue;
            startCountdown();
        }
    });

    stopButton.addEventListener('click', function() {
        clearInterval(countdown);
    });

    resetButton.addEventListener('click', function() {
        clearInterval(countdown);
        countdownElement.innerHTML = '';
        startInput.value = '';
    });

    function startCountdown() {
        clearInterval(countdown);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = startTime - now;

            if (distance < 0) {
                clearInterval(countdown);
                countdownElement.innerHTML = '<span class="countdown-finished">Countdown Finished!</span>';
                countdownElement.classList.add('animation-finished');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value${seconds <= 10 ? ' intense' : ''}">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value${seconds <= 10 ? ' intense' : ''}">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value${seconds <= 10 ? ' intense' : ''}">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value${seconds <= 10 ? ' intense' : ''}">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
        }

        updateCountdown();
        countdown = setInterval(updateCountdown, 1000);
    }
}