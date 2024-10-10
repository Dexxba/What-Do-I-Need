# What do I need - Einkaufslisten App

Dies ist eine mobile Anwendung zur Verwaltung von Einkaufslisten, die es Benutzern ermöglicht, ihre Einkäufe zu kategorisieren, Listen zu speichern und den Verlauf ihrer Einkäufe zu durchsuchen.

## Features
- Kategorien für Einkäufe hinzufügen
- Produkte zu Kategorien hinzufügen
- Einkaufslisten für ein bestimmtes Datum speichern
- Einkaufslistenverlauf anzeigen und einzelne Listen laden
- Möglichkeit, einzelne Listen oder den gesamten Verlauf zu löschen
- Einfaches und benutzerfreundliches Interface mit Swipe-Gesten

## Installation

### Voraussetzungen
- Installiertes Node.js und npm
- Installiertes Expo CLI

### Schritte zur Installation

1. **Repository klonen***

   Zuerst klonen Sie das Projekt-Repository auf Ihr lokales System:
   ```bash
   git clone https://github.com/Dexxba/What-Do-I-Need.git
   ```

2. **In das Projektverzeichnis wechseln**

   Wechseln Sie in das geklonte Verzeichnis:
   ```bash
   cd What-Do-I-Need
   ```

3. **Abhängigkeiten installieren**

   Installieren Sie die notwendigen Pakete und Abhängigkeiten:
   ```bash
   npm install
   ```

4. **Expo starten**

   Starten Sie Expo, um die Anwendung auf einem Gerät oder Emulator auszuführen:
   ```bash
   npm start
   ```

5. **Anwendung auf einem Gerät ausführen**

   - Verwenden Sie die Expo Go App auf Ihrem Mobilgerät, um die App zu testen. Scannen Sie den QR-Code, der im Browser angezeigt wird, oder verwenden Sie den Emulator.

### App-Struktur
- **HomeScreen**: Die Startseite, auf der der Benutzer die Optionen hat, eine neue Einkaufsliste zu erstellen oder den Einkaufsverlauf anzuzeigen.
- **ShopScreen**: Hier erstellt der Benutzer eine Einkaufsliste, fügt Kategorien und Produkte hinzu und speichert die Liste.
- **HistoryScreen**: Zeigt alle gespeicherten Listen an. Der Benutzer kann alte Listen laden, einzelne Listen löschen oder den gesamten Verlauf löschen.

## Verfügbare Befehle

- `npm start`: Startet den Entwicklungsserver.
- `npm run android`: Baut und startet die Anwendung auf einem Android-Emulator.
- `npm run ios`: Baut und startet die Anwendung auf einem iOS-Simulator (nur auf macOS verfügbar).
- `npm run build`: Erstellt eine Produktionsversion der Anwendung.

## Technologien
- **React Native**: Für die plattformübergreifende Entwicklung.
- **Expo**: Für die schnelle Entwicklung und das Testen der App.
- **AsyncStorage**: Zur Speicherung der Einkaufsdaten lokal auf dem Gerät.
- **DateTimePicker**: Zum Auswählen von Einkaufsdaten.
- **React Navigation**: Für die Navigation zwischen den Bildschirmen.
- **MaterialCommunityIcons**: Für ansprechende Icons in der App.

## Weiterentwicklung

Wenn Sie zur Weiterentwicklung der App beitragen möchten, können Sie gerne einen Pull-Request einreichen oder uns kontaktieren. Änderungen und Verbesserungen sind stets willkommen!

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der `LICENSE`-Datei.

