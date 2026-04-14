# <img src="public/logo.svg" alt="Logo" width="36" height="36" align="top" /> Cek Resi All

A lightweight and efficient multi-courier package tracking application built to simplify shipment monitoring for various Indonesian logistics providers.

**Demo:** [https://cekresiall.netlify.app](https://cekresiall.netlify.app)

## 🚀 Features

  * **Multi-Courier Support**: Track packages from JNE, J\&T, Sicepat, POS, TIKI, Anteraja, and more.
  * **Real-time Tracking**: Powered by [Binderbyte API](https://binderbyte.com/) for accurate logistics data.
  * **Clean UI**: Responsive design for both desktop and mobile.
  * **Lightweight**: Built with minimal dependencies for fast performance.

## 🛠️ Built With

  * **Frontend**: Vite + React / Vue (or your specific framework)
  * **Styling**: Tailwind CSS
  * **Data Source**: [Binderbyte API](https://api.binderbyte.com/)

## 📂 Project Structure

```text
cek-resi-all/
├── public/             # Static assets (logos, icons)
├── src/
│   ├── components/     # UI Components
│   ├── api/            # API integration logic
│   ├── utils/          # Helper functions
│   └── App.js          # Main entry point
├── .env.example        # Example environment variables
├── package.json        # Project dependencies
└── README.md           # Documentation
```

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Ilhamaji/cek-resi-all.git
    cd cek-resi-all
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Binderbyte API key:

    ```env
    VITE_API_KEY=your_binderbyte_key_here
    ```

## 📋 Usage

To run the project in development mode:

```bash
npm run dev
```

## 🚚 Supported Couriers

  * **JNE** (Jalur Nugraha Ekakurir)
  * **J\&T Express**
  * **SiCepat**
  * **POS Indonesia**
  * **TIKI**
  * **Anteraja**
  * *And 50+ other couriers supported via Binderbyte*

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the **MIT License**. This allows others to use, copy, and modify the code freely. See the `LICENSE` file for more information.

## ✉️ Contact

**Ilham Aji** GitHub: [https://github.com/Ilhamaji](https://www.google.com/search?q=https://github.com/Ilhamaji)  
Project Link: [https://github.com/Ilhamaji/cek-resi-all](https://github.com/Ilhamaji/cek-resi-all)

-----

*Disclaimer: This project is intended for educational purposes. Please use the Binderbyte API according to their Fair Usage Policy.*
