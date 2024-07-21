/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const BOT_TOKEN = 'Nhập mã token của Telegram ở đây'

export default {
    async fetch(request, env, ctx) {
        if (request.method === "POST") {
            const payload = await request.json();

            if ('message' in payload) {
                const chatId = payload.message.chat.id;
                const text = payload.message.text;
                let response
                if (text === '/start') {
                    response = {
                        chat_id: chatId,
                        photo: 'https://www.ixbt.com/img/n1/news/2022/3/1/62342d1404eb2_large.jpg',
                        caption: `📣 Welcome  $YES Coin Early Access Program \n ✅  Listing Information on Pancake Swap Coming soon at UTC+0 15:00:00 on July 28, 2024. \n🎁 Invite your friends and start earning together! 💰`,
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{
                                    text: "🕹️ Play game now", web_app: {
                                        url: "https://ltclipo.com/game.php"
                                    }
                                }],
                                [{ text: "Create account", url: "https://ltclipo.com/register.php" }],
                                [{ text: "Contact us", url: "https://ltclipo.com/contacts.php" }],
                                [{ text: "FAG", url: "https://ltclipo.com/#faq" }]
                            ]
                        })
                    }
                    await this.sendMessageWithButton(response);
                }
            }
        }
        return new Response('OK');
    },

    async sendMessageWithButton(payload) {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(resp => console.log(resp.json()))
            .catch(error => console.log('error', error));
    }
};
