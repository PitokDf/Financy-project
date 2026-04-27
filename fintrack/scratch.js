const parseVoiceInput = (text) => {
        let processedText = text.toLowerCase().replace(/rp/g, '').trim();
        
        // Remove decimal cents like ,00 or .00
        processedText = processedText.replace(/[,.]00\b/g, '');
        
        // Remove dots or commas used as thousand separators (e.g. 25.000 or 25,000)
        processedText = processedText.replace(/(\d)[.,](\d{3})/g, '$1$2');
        processedText = processedText.replace(/(\d)[.,](\d{3})/g, '$1$2');

        // Handle text numbers if browser didn't auto-convert
        processedText = processedText.replace(/sebelas/g, '11')
                     .replace(/sepuluh/g, '10')
                     .replace(/seratus/g, '100')
                     .replace(/seribu/g, '1000')
                     .replace(/sejuta/g, '1000000');
                     
        const idNums = { 'satu': '1', 'dua': '2', 'tiga': '3', 'empat': '4', 'lima': '5', 'enam': '6', 'tujuh': '7', 'delapan': '8', 'sembilan': '9' };
        for (const [k, v] of Object.entries(idNums)) {
            processedText = processedText.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
        }
        
        processedText = processedText.replace(/(\d+)\s*belas/g, '1$1');
        processedText = processedText.replace(/(\d+)\s*puluh\s*(\d*)/g, (m, p1, p2) => p2 ? `${p1}${p2}` : `${p1}0`);
        processedText = processedText.replace(/(\d+)\s*ratus\s*(\d*)/g, (m, p1, p2) => p2 ? `${p1}${p2.padStart(2, '0')}` : `${p1}00`); 
        processedText = processedText.replace(/(\d+)\s*ribu\s*(\d*)/g, (m, p1, p2) => p2 ? `${p1}${p2.padStart(3, '0')}` : `${p1}000`);
        processedText = processedText.replace(/(\d+)\s*juta\s*(\d*)/g, (m, p1, p2) => p2 ? `${p1}${p2.padStart(6, '0')}` : `${p1}000000`);

        processedText = processedText.replace(/(\d+)\s*(ribu|k)\b/gi, (_, num) => String(Number(num) * 1000));
        processedText = processedText.replace(/(\d+)\s*(juta|m)\b/gi, (_, num) => String(Number(num) * 1000000));

        const numbers = processedText.match(/\d+/g);
        let amount = 0;
        let amountStr = '';
        if (numbers && numbers.length > 0) {
            amountStr = numbers[numbers.length - 1];
            amount = Number(amountStr);
        }

        let description = text.toLowerCase()
            .replace(/rp/g, '')
            .replace(/rupiah/g, '')
            .replace(/[,.]00\b/g, '')
            .replace(/(\d)[.,](\d{3})/g, '$1$2')
            .replace(/(\d)[.,](\d{3})/g, '$1$2')
            .replace(amountStr, '')
            // Also need to remove text versions from description if we parsed them
            // Actually just replacing the text that was converted to amountStr from the original text is hard.
            // Let's just use the original words and remove the number-related ones.
            
        // To be simpler:
        description = processedText.replace(amountStr, '')
            .replace(/rupiah/gi, '')
            .replace(/\s+/g, ' ')
            .trim();

        if (description) {
            description = description.charAt(0).toUpperCase() + description.slice(1);
        }
        
        return { amount, description };
    };

console.log(parseVoiceInput("beli kopi 2 puluh 5 ribu"));
console.log(parseVoiceInput("makan siang seratus ribu"));
console.log(parseVoiceInput("dua puluh lima ribu rupiah"));
console.log(parseVoiceInput("gaji 5.000.000,00"));
