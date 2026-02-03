# ChainMaster AI - Supply Chain Dashboard

Modern, AI-powered supply chain management dashboard built with React, TypeScript, and OpenAI integration.

## 🚀 Features

- **Multi-language Support**: English, Turkish, Hindi
- **AI-Powered Insights**: OpenAI integration for supply chain analysis
- **Comprehensive Modules**:
  - 📊 Dashboard with KPI overview
  - 🛒 Procurement management
  - 🚛 Logistics tracking
  - 🏭 Warehouse operations
  - 🛃 Customs management
- **Responsive Design**: Built with Tailwind CSS
- **Secure API**: Backend API endpoints for OpenAI integration
- **Ready for Production**: Vercel deployment ready

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel
- **Language**: Multi-language support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tahadervisoglu-dx/chaindemo.git
cd chaindemo
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Start development server:
```bash
npm run dev
```

## 🌐 Deployment

### Vercel Deployment

1. Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

2. Add environment variables in Vercel Dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key

3. Redeploy after adding environment variables

## 🔒 Security

- ✅ API keys are secured on the backend
- ✅ No sensitive data exposed to frontend
- ✅ Serverless functions for AI integration
- ✅ Environment variables for configuration

## 📱 Language Support

Switch between languages using the language selector:
- 🇺🇸 English
- 🇹🇷 Turkish (Türkçe)
- 🇮🇳 Hindi (हिंदी)

## 🤖 AI Features

- Supply chain data analysis
- Risk assessment
- Performance recommendations
- Multi-language insights

## 📊 Modules

### Dashboard
- KPI overview
- Cross-departmental performance
- Real-time metrics

### Procurement
- Order analysis
- Price variance tracking
- Supplier performance
- BOM control

### Logistics
- Transportation tracking
- Vehicle utilization
- Delivery performance

### Warehouse
- Inventory management
- Stock movements
- Efficiency metrics

### Customs
- Import/Export tracking
- Clearance times
- Compliance monitoring

## 🔧 Development

### Project Structure
```
├── components/          # React components
├── services/           # API services
├── api/               # Serverless functions
├── translations.ts    # Language translations
├── types.ts          # TypeScript types
└── vite.config.ts    # Vite configuration
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue on GitHub.

---

Built with ❤️ for modern supply chain management