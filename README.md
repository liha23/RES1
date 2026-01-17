# GGSIPU Result Checker

A fast, mobile-friendly portal to check GGSIPU (Guru Gobind Singh Indraprastha University) exam results instantly.

## Features

- 📊 **Semester-wise Results**: View marks for each semester
- 📈 **CGPA & SGPA Tracking**: Track your cumulative and semester GPAs
- 📋 **Subject-wise Grades**: Detailed breakdown of all subjects
- 📱 **Mobile Friendly**: Works seamlessly on all devices
- ⚡ **Fast & Secure**: Direct data fetch from official GGSIPU portal
- 🔐 **Remember Me**: Optionally save credentials securely in MongoDB (requires configuration)

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Recharts
- **Database**: MongoDB (optional, for credential storage)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account or local MongoDB (optional, for "Remember Me" feature)

### Installation

```bash
# Clone the repository
git clone https://github.com/liha23/RES1.git
cd RES1

# Install dependencies
npm install

# Configure environment variables (optional)
# Copy .env.sample to .env.local and add your MongoDB URI
cp .env.sample .env.local
# Edit .env.local and add your MongoDB connection string

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Configuration

### MongoDB Setup (Optional)

The "Remember Me" feature requires MongoDB to securely store user credentials. If you don't configure MongoDB, the app will still work, but the "Remember Me" feature will be disabled.

1. **Create a MongoDB database**:
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
   - Or use a local MongoDB instance

2. **Configure environment variables**:
   - Copy `.env.sample` to `.env.local`
   - Update the `MONGODB_URI` with your connection string:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
     ```

3. **Security Notes**:
   - User passwords are hashed using bcrypt before storage
   - The MongoDB connection string is stored in environment variables (never committed to git)
   - Credentials are stored only when the user explicitly enables "Remember Me"

## Usage

1. Enter your GGSIPU enrollment number
2. Enter your password (default: father's name in CAPITAL LETTERS)
3. Enter the captcha
4. (Optional) Enable "Remember my credentials securely" to save credentials
5. Click Login to view your results

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
