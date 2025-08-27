# Cryptonium: A Hybrid (AES-RSA) Encryption Tool

A pure JavaScript implementation of a hybrid cryptosystem that combines the AES-128 symmetric cipher for bulk encryption with the RSA asymmetric cipher for secure key exchange. Built from scratch without external cryptographic libraries.

![JavaScript](https://img.shields.io/badge/JavaScript-100%25-F7DF1E?logo=javascript)
![Web](https://img.shields.io/badge/Platform-Web-5ED3F3?logo=html5&logoColor=white)
![Cryptography](https://img.shields.io/badge/Focus-Cryptography-000000?logo=key)

## ✨ Overview

This project demonstrates a fundamental modern security paradigm: using a symmetric key (AES) to encrypt data efficiently and an asymmetric key pair (RSA) to encrypt that symmetric key for secure transmission. The entire logic for both AES (Key Expansion, SubBytes, ShiftRows, MixColumns) and RSA (key generation, modular exponentiation) is implemented in vanilla JavaScript.

## 🚀 Features

- **Hybrid Encryption Model:** Encrypts data with a randomly generated AES-128 key and then encrypts that key with the recipient's RSA public key.
- **From-Scratch Implementation:** Contains custom implementations of core algorithms:
  - **AES-128:** Key Expansion, Encryption, and Decryption rounds.
  - **RSA:** Prime generation, key pair derivation, encryption, and decryption.
- **Web-Based Interface:** A clean, intuitive web interface for encryption and decryption operations.

## 📸 Project Showcase

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/560013e5-f7bf-4796-859b-caac5bcda731" />


## 🛠️ How to Use

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gokawsar/Cryptonium-Hybrid-AES-RSA-Cryptosystem.git
    ```
2.  **Navigate to the project directory and open `index.html`** in your web browser.
3.  **Encrypt a Message:**
    - Type your message in the "Your Message" field.
    - Enter the recipient's public key (or use the one generated on the page).
    - Click "Encrypt". The encrypted message and the encrypted AES key will be displayed.
4.  **Decrypt a Message:**
    - Paste the encrypted message into the "Encrypted Message" field.
    - Paste the encrypted AES key into the corresponding field.
    - Enter your private key.
    - Click "Decrypt" to see the original message.

## 🧠 Technical Deep Dive

The core cryptographic processes are handled in `Hybrid Cipher.js`:

- **AES Key Expansion:** Transforms a 16-byte key into 44 words for the 11 rounds of AES-128.
- **AES Encryption/Decryption:** Implements all rounds, including SubBytes, ShiftRows, MixColumns, and AddRoundKey, and their inverses.
- **RSA Key Generation:** Generates key pairs from large primes using the Extended Euclidean Algorithm to compute the private exponent `d`.
- **Modular Exponentiation:** Efficiently computes `c = m^e mod n` for encryption and `m = c^d mod n` for decryption.

## 📁 Project Structure
hybrid-cipher-aes-rsa/
├── index.html # Main webpage structure
├── Hybrid Cipher.js # Core cryptographic logic
├── Hybrid Cipher.css # Styling for the webpage
└── README.md # This file

## 🔮 Future Enhancements

- Implement AES in CBC (Cipher Block Chaining) mode to enhance security against pattern analysis.
- Increase the RSA key size beyond 128 bits for stronger security.
- Add a proper key management system for storing and sharing public keys.
- Deploy as a live web application.

## 👨‍💻 Developed By

**MD. KAWSAR AHMED - 222002131**  
** Aerafat Jahan Srite - 223002129** 
** Md. Mehedi Hasan Akas - 183002157** 
*Department of CSE, Green University of Bangladesh*

This project was developed for the **Computer and Cyber Security (CSE 323)** course.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
