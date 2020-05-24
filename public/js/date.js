startTime = () => {
    const date = new Date();
    const currentDate = date.getUTCDate();
    const currentYear = date.getUTCFullYear();
    const currentMonth = date.getUTCMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentTime = date.toLocaleTimeString()
    const infoContainerText = `As of ${currentDate} ${monthNames[currentMonth]} ${currentYear}, ${currentTime}`;
    document.getElementsByClassName('info-header')[0].innerHTML = infoContainerText;
    let t = setTimeout(startTime, 500);
}




