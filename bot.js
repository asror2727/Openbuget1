const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

const BOT_TOKEN = process.env.BOT_TOKEN || 'BOT_TOKENINGIZNI_SHU_YERGA_YOZING';
const PORT = process.env.PORT || 3000;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://yoursite.com'; // Web App joylashgan havola (Glitch, Render yoki Vercel linki)

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Web App fayllarini ko'rsatish uchun static papka
app.use(express.static(path.join(__dirname, 'public')));

bot.start((ctx) => {
  ctx.reply(
    `👋 Assalomu alaykum, <b>${ctx.from.first_name}</b>!\n\n` +
    `💠 OpenBudget rangli menyusini ochish uchun pastdagi tugmani bosing:`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🟢 OpenApp Menyuni ochish 🟢', WEBAPP_URL)]
      ])
    }
  );
});

bot.launch();

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda...`);
});
