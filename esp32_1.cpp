#include <Arduino.h>
#include "soc/rtc.h"
#include "HX711.h"
#include <WiFi.h>
#include <HTTPClient.h>

// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 16;
const int LOADCELL_SCK_PIN = 4;
const long DIFF = 30000;
long reading = 0;
int status = 0;
int detect = 0;
const char* ssid = "Design_for_Participation";
const char* password = "DesignParticipation";
String serverPath = "http://192.168.4.59:5000/";
      
HX711 scale;

void setup() {
  Serial.begin(9600);
  Serial.println("\n[*] Creating AP");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("[+] AP Created with IP Gateway ");
  Serial.println(WiFi.softAPIP());

  int i=0;
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print("waiting for ");
    Serial.print(i++); Serial.println("s...");
  }
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
}

void loop() {
  if (scale.is_ready()) {
    long new_reading = scale.read();
    // Serial.println(new_reading);
    if ((reading - new_reading > DIFF) && status == 1 && detect >= 3) {
      Serial.println("CUP LIFTED");
      status = 0;
      detect = 0;
        HTTPClient http;
        String request = serverPath + "lift1";
        http.begin(request.c_str());
        int httpResponseCode = http.GET();
        
        if (httpResponseCode>0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        }
        else {
          Serial.print("Error code: ");
          Serial.println(httpResponseCode);
        }
        http.end();
    } else if ((reading - new_reading < -DIFF) && status == 0 && detect >= 3) {
      Serial.println("CUP SET");
      status = 1;
      detect = 0;
        HTTPClient http;
        String request = serverPath + "set1";
        http.begin(request.c_str());
        int httpResponseCode = http.GET();
        
        if (httpResponseCode>0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        }
        else {
          Serial.print("Error code: ");
          Serial.println(httpResponseCode);
        }
        http.end();
    } else {
      detect++;
    }
    reading = new_reading;
  } else {
    Serial.println("HX711 not found.");
  }
  delay(200);
}
