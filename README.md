# <img src="public/logo.svg" alt="Logo" width="36" height="36" align="top" /> Cek Resi All

A lightweight and efficient multi-courier package tracking library/application built to simplify shipment monitoring for various Indonesian logistics providers.
Demo : [CekResiAll](https://cekresiall.netlify.app)

## 🚀 Features

  * **Multi-Courier Support**: Track packages from various popular couriers in Indonesia (JNE, J\&T, Sicepat, POS, TIKI, etc.).
  * **Real-time Tracking**: Fetch the latest status updates directly from logistics providers.
  * **Simple Integration**: Clean API/structure making it easy to integrate into larger web or mobile applications.
  * **Lightweight**: Minimal dependencies for faster execution and easier deployment.

## 🛠️ Built With

  * **Backend/Engine**: Node.js
  * **Data Source**: Scraping or Unofficial API integration.

## 📦 Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/Ilhamaji/cek-resi-all.git
cd cek-resi-all
```

Install dependencies:

```bash
# Example for Node.js
npm install

# Example for PHP/Composer
composer install
```

## 📋 Usage

### Basic Example

Here is how you can use the tracker in your project:

```javascript
// Example code snippet
const cekResi = require('./src/cek-resi');

cekResi.track('JNE', '21000123456789')
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });
```

## 🚚 Supported Couriers

  * **JNE** (Jalur Nugraha Ekakurir)
  * **J\&T Express**
  * **SiCepat**
  * **POS Indonesia**
  * **TIKI**
  * **Anteraja**
  * *And more...*

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## ✉️ Contact

**Ilham Aji** - [GitHub Profile](https://www.google.com/search?q=https://github.com/Ilhamaji)  
Project Link: [https://github.com/Ilhamaji/cek-resi-all](https://www.google.com/search?q=https://github.com/Ilhamaji/cek-resi-all)

-----

*Disclaimer: This project is intended for educational purposes. Use it responsibly and respect the terms of service of the respective logistics providers.*
