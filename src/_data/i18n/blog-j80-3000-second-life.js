module.exports = {
    de: {
        "post4.meta": "Werkstattbericht · Projekt J80-3000",
        "post4.date": "22. April 2026",
        "post4.title": "J80-3000 – einer alten Cherry ein zweites Leben geben",
        "post4.p1": "Die G80-3000 hat für mich genau das, was viele alte Geräte interessant macht: Sie sieht nach echter Hardware aus und hat Charakter. Gleichzeitig merkt man ihr an, dass sich die Welt der Tastaturen seit ihrer Entstehung weiterentwickelt hat.",
        "post4.p2": "Deshalb wollte ich nicht einfach nur einen Adapter für PS/2 bauen. Das Ziel des Projekts ist ein kompletter Controller-Swap. Der originale Controller musste dafür einem WeAct Blackpill mit STM32-F411 weichen.",
        "post4.p3": "Für die Fullsize-Matrix reicht die Zahl der direkt verfügbaren GPIO-Pins nicht aus. Deshalb kommt zusätzlich ein MCP23017 über I2C zum Einsatz. Bei einem der ersten Tests erkannte der PC den Blackpill bereits als Tastatur-Device – nur tippen wollte die G80 noch nicht.",
        "post4.quote": "Der PC sagt „Tastatur erkannt“. Die Tastatur sagt: „Nö.“",
        "post4.p4": "Damit war der Hardware-Umbau aber noch nicht abgeschlossen: Als Nächstes stand die Firmware an. Durch den I2C-Expander brauchte das Projekt eine passende Scan-Routine, die die Tastenmatrix ausliest und die Zustände korrekt an den Controller weitergibt. Genau hier wurde es für mich besonders spannend – ich musste mich deutlich tiefer in C, QMK und die Funktionsweise einer Keyboard-Matrix einarbeiten.",
        "post4.p5": "In der anschließenden Firmwarearbeit bekam ich die Matrix schließlich zum Laufen. Die J80-3000 funktioniert inzwischen vollständig und lässt sich über VIA konfigurieren. Dieser Beitrag hält den Weg vom Controller-Swap bis zu diesem Zwischenziel fest. Die Geschichte geht weiter: In weiteren Artikeln möchte ich einzelne Schritte, Probleme und Lösungen genauer dokumentieren – statt die gesamte Entwicklung in einen einzigen Werkstattbericht zu packen.",
        "post4.image.alt": "J80-3000 mit gedruckter Switch-Plate geöffnet",
        "post4.image.title": "J80-3000 mit gedruckter Switch-Plate",
        "post4.image.caption": "J80-3000 mit gedruckter Switch-Plate",
        "post4.navTitle": "J80-3000 – einer alten Cherry ein zweites Leben geben",
        "post3.navTitle": "Der schönste Nebeneffekt: Tastaturen für andere bauen",
        "post5.navTitle": "10 € und ein PS/2-Stecker"
    },
    en: {
        "post4.meta": "Workshop log · Project J80-3000",
        "post4.date": "April 22, 2026",
        "post4.title": "J80-3000 – giving an old Cherry a second life",
        "post4.p1": "The G80-3000 has exactly what makes many old devices interesting to me: it looks like real hardware and has character. At the same time, you can tell how much keyboard technology has evolved since it was designed.",
        "post4.p2": "I didn't want to build just a PS/2 adapter. The goal was a complete controller swap, replacing the original controller with a WeAct Blackpill based on the STM32F411.",
        "post4.p3": "The full-size matrix needs more GPIO pins than are directly available, so an MCP23017 I/O expander is connected over I2C as well. During one of the first tests, the PC already recognized the Blackpill as a keyboard device – it just wouldn't type yet.",
        "post4.quote": "The PC says, “Keyboard detected.” The keyboard says, “Nope.”",
        "post4.p4": "But the hardware conversion wasn't the end of the job. Firmware was next. The I2C expander meant the project needed a suitable scan routine to read the key matrix and pass the states on to the controller correctly. This was where things got especially interesting for me: I had to dig much deeper into C, QMK and how a keyboard matrix actually works.",
        "post4.p5": "During the firmware work that followed, I eventually got the matrix working. The J80-3000 is now fully functional and can be configured with VIA. This article documents the journey from the controller swap to that milestone. The story doesn't end here: I plan to cover individual steps, problems and solutions in more detail in future posts, rather than squeezing the entire project into one workshop log.",
        "post4.image.alt": "J80-3000 opened up with its 3D-printed switch plate",
        "post4.image.title": "J80-3000 with its 3D-printed switch plate",
        "post4.image.caption": "J80-3000 with its 3D-printed switch plate",
        "post4.navTitle": "J80-3000 – giving an old Cherry a second life",
        "post3.navTitle": "The best side effect: building keyboards for other people",
        "post5.navTitle": "€10 and a PS/2 connector"
    }
};
