/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


//https://api.telegram.org/bot7053152705:AAEJfD9AB0hqlj6hPPVP1VoTkAyvi1RM_Ds/setWebhook?url=https://telegram.mb55p2g2dd.workers.dev/

import { botAnswer, botUrl } from './data.js'

export default {
  async fetch(request, env, ctx) {
      if (request.method === "POST") {
          const payload = await request.json();
          if ('message' in payload) {
              const chatId = payload.message.chat.id;
              const text = payload.message.text;
              let response
              if(text != '#ai' && text != '#chatbot'){
                response = encodeURIComponent(botAnswer)
              }else{
                response = encodeURIComponent(botUrl)
              }
              await this.sendMessage(env.API_KEY, chatId, response);
          }
      }
      return new Response('OK');
  },

  async sendMessage(apiKey, chatId, text) {
      const url = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${text}`;
      const data = await fetch(url).then(resp => resp.json());
  }
};
