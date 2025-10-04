# ⚡ EcoEnergy – Application Web de Gestion et Suivi des Projets d’Énergies Renouvelables

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📌 Description

**EcoEnergy** est une application web intégrée développée lors d’un stage à l’entreprise **RATITEC**, spécialisée dans les énergies renouvelables.  
L’objectif principal est de **centraliser la gestion des projets**, d’améliorer la communication entre administrateurs, techniciens et clients, et de garantir un **suivi transparent et automatisé**.

La plateforme permet de :
- Créer et gérer des projets solaires/éoliens
- Assigner et suivre les tâches des techniciens
- Offrir aux clients un espace dédié pour consulter l’avancement
- Automatiser la facturation et permettre le paiement en ligne:contentReference[oaicite:1]{index=1}  

---

## 🚀 Fonctionnalités principales

- 🔐 **Gestion des utilisateurs et authentification**  
  - Rôles : Administrateur, Technicien, Client  
  - Authentification sécurisée via Laravel Breeze & Sanctum  

- 📊 **Gestion des projets et tâches**  
  - Création, modification et suppression de projets  
  - Suivi des jalons et avancement des tâches en temps réel  
  - Attribution des techniciens aux projets  

- 🛠️ **Espace technicien**  
  - Dashboard personnel  
  - Mise à jour de l’état des interventions  
  - Upload de rapports et documents  

- 👤 **Espace client**  
  - Consultation de l’avancement des projets  
  - Validation des jalons  
  - Paiement en ligne des factures  
  - Création de tickets de support  

- 💵 **Facturation et paiements**  
  - Génération automatique de factures PDF  
  - Gestion de l’état des factures (émise, payée, en retard)  
  - Paiement en ligne sécurisé:contentReference[oaicite:2]{index=2}  

---

## 🛠️ Technologies utilisées

### 🔧 Back-end
- **PHP 8+**
- **Laravel** (Framework MVC)  
- **Laravel Breeze** (authentification)  
- **Laravel Sanctum** (sécurité et API tokens)  

### 🎨 Front-end
- **Next.js (React)** pour interfaces modernes et performantes  
- **TypeScript / JavaScript**  
- **TailwindCSS** pour le design réactif et rapide  
- **React Hook Form** pour la gestion des formulaires  

### 💾 Base de données
- **MySQL**  

### ⚙️ Environnement de développement
- **VS Code** (IDE)  
- **Composer** (gestion des dépendances PHP)  
- **Git** (versioning & collaboration)  
- **WampServer/XAMPP** (serveur local):contentReference[oaicite:3]{index=3}  

---

## 📂 Architecture du projet

```text
ecoenergy/
 ├── backend/ (Laravel API & logique métier)
 │   ├── app/
 │   ├── routes/
 │   └── database/
 ├── frontend/ (Next.js + React UI)
 │   ├── pages/
 │   ├── components/
 │   └── styles/
 └── README.md
````
---

⚡ Installation et exécution
1️⃣ Cloner le projet
git clone https://github.com/username/ecoenergy.git
cd ecoenergy

2️⃣ Installer les dépendances

Backend (Laravel)

cd backend
composer install
cp .env.example .env
php artisan key:generate


Frontend (Next.js)

cd frontend
npm install

3️⃣ Configurer la base de données

Créer une base ecoenergy_db

Importer le fichier /backend/database/ecoenergy.sql

Configurer .env avec vos identifiants MySQL

4️⃣ Lancer le projet

Backend :

php artisan serve

Frontend :

npm run dev

📸 Interfaces principales

Page d’accueil (Home, Services, À propos, Support)

Login & inscription

Dashboard administrateur (projets, techniciens, factures)

Dashboard technicien (tâches, rapports, progression)

Dashboard client (suivi projets, paiements, support)

Module de facturation et paiements en ligne
