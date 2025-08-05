# Iluto - AI Powered Recipe Generator

A modern, AI-powered recipe discovery platform that generates personalized Asian-Filipino recipes using advanced language models. Built with React and powered by Groq's lightning-fast AI inference.

## 🌟 Features

### Core Features
- **AI-Generated Recipes**: Leverages Groq's LLaMA 3 model to generate authentic Asian-Filipino recipes
- **Featured Dish Spotlight**: Daily/weekly featured recipes with detailed cooking instructions
- **Smart Recipe Search**: Intelligent recipe generation based on user preferences and dietary requirements
- **Responsive Design**: Fully responsive interface that works seamlessly across desktop, tablet, and mobile devices
- **Real-time Generation**: Fast recipe generation using Groq's optimized inference engine

### Recipe Features
- **Detailed Instructions**: Step-by-step cooking instructions for all skill levels
- **Ingredient Lists**: Complete ingredient lists with measurements
- **Cooking Information**: Cook time, servings, and difficulty level for each recipe
- **Cuisine Focus**: Specialized in Asian-Filipino fusion cuisine
- **Difficulty Levels**: Recipes categorized by cooking complexity (Easy, Medium, Hard)

### User Experience
- **Clean Interface**: Modern, intuitive UI design
- **Fast Loading**: Optimized performance with fallback data systems
- **Error Handling**: Robust error handling with graceful fallbacks
- **Accessibility**: Built with accessibility best practices

## 🚀 Technologies Used

### Frontend Framework
- **React**: Modern JavaScript library for building user interfaces
- **JavaScript (ES6+)**: Latest JavaScript features and syntax
- **HTML5 & CSS3**: Modern web standards

### AI & API Integration
- **Groq API**: Ultra-fast AI inference platform
- **LLaMA 3-8B**: Advanced language model for recipe generation
- **REST API**: RESTful API integration for seamless data flow

### Development Tools
- **Vite**: Next-generation frontend build tool
- **Environment Variables**: Secure API key management
- **Modular Architecture**: Component-based development approach

### Performance & Reliability
- **Fallback System**: Robust fallback recipes when API is unavailable
- **Error Boundaries**: Comprehensive error handling
- **Async Operations**: Non-blocking API calls for smooth UX

## 📁 Project Structure

```
recipe-app/
├── src/
│   ├── components/
│   │   ├── FeaturedDish.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeList.jsx
│   │   └── RecipeResults.jsx
|   |   └── IngredientInput.jsx
|   |   └── IngredientTag.jsx
|   |   └── Header.jsx
|   |   └── Footer.jsx
│   ├── services/
│   │   └── groqApi.js
│   ├── ui/
│   │   └── LoadingSpinner.jsx
│   ├── App.jsx
│   ├── Index.css
│   ├── App.css
│   └── main.jsx
├── public/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpcunanan716/iluto.git
   cd iluto
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Your Groq API key for AI recipe generation | Yes |

### API Configuration
The application uses Groq's OpenAI-compatible API endpoint:
- **Base URL**: `https://api.groq.com/openai/v1/chat/completions`
- **Model**: `llama3-8b-8192`
- **Max Tokens**: 8192 (configurable)
- **Temperature**: 0.7 (balanced creativity)

## 🎯 Use Cases

### For Home Cooks
- **Daily Meal Planning**: Generate quick weeknight dinner ideas
- **Special Occasions**: Find impressive dishes for gatherings
- **Dietary Accommodations**: Get recipes tailored to specific dietary needs
- **Skill Development**: Access recipes appropriate for your cooking level

### For Food Enthusiasts
- **Cultural Exploration**: Discover authentic Asian-Filipino dishes
- **Recipe Experimentation**: Generate unique fusion recipes
- **Cooking Inspiration**: Find creative ways to use available ingredients
- **Meal Variety**: Break out of cooking routines with diverse options

### For Restaurants & Food Businesses
- **Menu Development**: Generate new dish ideas for seasonal menus
- **Fusion Concepts**: Create innovative Asian-Filipino fusion dishes
- **Cost-Effective Planning**: Optimize ingredient usage across multiple recipes
- **Staff Training**: Use structured recipes for kitchen training

### For Content Creators
- **Food Blogging**: Generate content for food blogs and social media
- **Recipe Testing**: Quick recipe ideas for content creation
- **Cultural Content**: Authentic recipes for cultural food content
- **Video Content**: Structured recipes perfect for cooking videos

## 🎨 Key Components

### FeaturedDish Component
- Displays a prominently featured recipe
- Calls Groq API with `isFeaturedDish=true`
- Shows detailed recipe information with enhanced styling

### RecipeList Component
- Displays multiple recipes in a grid or list format
- Handles bulk recipe generation (5-10+ recipes)
- Implements search and filter functionality

### API Integration (groqApi.js)
- Manages all Groq API communications
- Handles authentication and error scenarios
- Provides fallback data for offline functionality
- Supports configurable recipe quantities

## 🔒 Security Features

- **API Key Protection**: Environment variables keep API keys secure
- **Input Validation**: Sanitizes user inputs before API calls
- **Error Boundaries**: Prevents application crashes from API failures
- **Rate Limiting**: Respectful API usage with built-in limits

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deployment Platforms
- **Vercel**: Recommended for React applications
- **Netlify**: Easy deployment with environment variable support
- **AWS S3 + CloudFront**: Scalable static hosting
- **GitHub Pages**: Free hosting for open source projects

### Environment Setup
Ensure your deployment platform has access to:
- `VITE_GROQ_API_KEY` environment variable
- Node.js build environment
- Static file serving capabilities

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Write clean, commented code
- Test all API integrations thoroughly
- Ensure responsive design across devices
- Maintain consistent code formatting

## 📝 API Documentation

### Recipe Generation Endpoint

```javascript
callGroqAPI(prompt, isFeaturedDish, numberOfRecipes)
```

**Parameters:**
- `prompt` (string): Description of desired recipes
- `isFeaturedDish` (boolean): Whether to generate a single featured recipe
- `numberOfRecipes` (number): Number of recipes to generate (default: 10)

**Response Format:**
```json
{
  "name": "Recipe Name",
  "description": "Brief recipe description",
  "cookTime": "30 mins",
  "servings": "4",
  "difficulty": "Medium",
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": ["step1", "step2"]
}
```

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
- Verify your Groq API key is correct
- Check environment variable naming (`VITE_GROQ_API_KEY`)
- Ensure API key has sufficient credits

**JSON Parsing Errors**
- The app includes robust JSON parsing with multiple fallback methods
- Check console logs for raw API responses
- Verify API response format matches expected structure

**Performance Issues**
- Reduce `numberOfRecipes` for faster generation
- Consider using a more powerful Groq model
- Implement recipe caching for frequently requested types

## 📊 Performance Metrics

- **Average Recipe Generation**: 2-5 seconds
- **Fallback Response Time**: <100ms
- **API Token Usage**: ~500-800 tokens per recipe
- **Concurrent Users**: Scales with Groq API limits

## 🎓 Learning Resources

- [Groq API Documentation](https://docs.groq.com/)
- [React Documentation](https://react.dev/)
- [Vite Build Tool](https://vitejs.dev/)
- [Asian-Filipino Cuisine Guide](https://example.com/cuisine-guide)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Groq**: For providing ultra-fast AI inference
- **Meta**: For the LLaMA 3 language model
- **React Team**: For the amazing React framework
- **Filipino Culinary Community**: For inspiration and authenticity

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/recipe-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/recipe-app/discussions)
- **Email**: support@recipeapp.com

---

**Made with ❤️ for food lovers and home cooks everywhere**
