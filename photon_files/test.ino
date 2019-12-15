// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_VEML6070.h>
#include <AssetTracker.h>

bool executeStateMachines = false;

Adafruit_VEML6070 UVTracker = Adafruit_VEML6070();
AssetTracker locationTracker = AssetTracker();

float totalUV = 0.0;

void setup() {
    
    Serial.begin(9600); //define the baud rate
    
    // Initialize the gps and turn it on    
    locationTracker.begin();
    locationTracker.gpsOn();
    
    //Initialize the UV sensor
    UVTracker.begin(VEML6070_1_T);
    Particle.subscribe("hook-response/gpsData", myHandler, MY_DEVICES);
}


void loop() {
    String data = "";
    
    //Get the UV values
    totalUV = UVTracker.readUV();
    
    locationTracker.updateGPS(); // get the location
    
    Serial.println("Checking for Fix");
    if (locationTracker.gpsFix()) { //GPS Fixed
        data = String::format("{ \"lon\": \"%f\", \"lat\": \"%f\", \"GPS_speed\": \"%f\", \"uv\": \"%f\" }", locationTracker.readLonDeg(), locationTracker.readLatDeg(), locationTracker.getSpeed(), totalUV);  
        Serial.println("Fix"); 
        Particle.publish("gpsData", data, PRIVATE);
    }
    else {
        Serial.println("NO Fix"); //GPS not fixed
        data = String::format("{ \"lon\": \"%f\", \"lat\": \"%f\", \"GPS_speed\": \"%f\", \"uv\": \"%f\" }", 999.999, 999.999, 5.0, totalUV);
        }
    Serial.println(data);
    

    delay(1000);
}

void myHandler(const char *event, const char *data) {
  // Formatting output
  String output = String::format("Response from Post:\n  %s\n", data);
  // Log to serial console
  Serial.println(output);
}