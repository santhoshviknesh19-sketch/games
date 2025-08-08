#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int main() {
    bool on = true;
    bool off = false;

    int battery = 100;
    bool power = true;

    bool light1 = off;
    bool light2 = off;
    bool light3 = off;

    char button1[4]; // stores four characters
    char button2[4];

    if (battery == 0) {
        power = false;
    }

    while (power) {
        printf("Enter on/off for button1: ");
        scanf("%3s", button1);  // null terminator

        printf("Enter on/off for button2: ");
        scanf("%3s", button2);

        // string compare
        if (strcmp(button1, "on") == 0 && strcmp(button2, "off") == 0) {
            light1 = on;
            light2 = off;
            light3 = off;
        } else if (strcmp(button1, "off") == 0 && strcmp(button2, "on") == 0) {
            light1 = off;
            light2 = on;
            light3 = off;
        } else if (strcmp(button1, "on") == 0 && strcmp(button2, "on") == 0) {
            light1 = off;
            light2 = off;
            light3 = on;
        } else {
            light1 = off;
            light2 = off;
            light3 = off;
        }

        printf("\nLight1: %d, Light2: %d, Light3: %d\n", light1, light2, light3);
        break;
    }

    return 0;
}
