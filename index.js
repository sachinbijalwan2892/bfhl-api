const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Data must be an array'
      });
    }

    
    let even_numbers=[];
    let odd_numbers=[];
    let alphabets=[];
    let special_characters=[];
    let sum=0;
    let concat_string='';

    
    data.forEach(item => {
      
      const strItem = String(item);

      
      if (!isNaN(strItem) && strItem.trim() !== '') {
        const num = Number(strItem);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(strItem);
        } else {
          odd_numbers.push(strItem);
        }
      }
      
      else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
      }
      
      else {
        special_characters.push(strItem);
      }
    });

    
    const allAlphabets = data
      .filter(item => /^[a-zA-Z]+$/.test(String(item)))
      .join('')
      .split('')
      .reverse();
    concat_string = allAlphabets
      .map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');

    
    res.status(200).json({
      is_success: true,
      user_id: 'john_doe_17091999',
      email: 'john@xyz.com',
      roll_number: 'ABCD123',
      even_numbers,
      odd_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// Start server (not needed for Vercel, but useful for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;