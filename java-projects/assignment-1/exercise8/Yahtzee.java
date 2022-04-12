package assignment_2.exercise8;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Font;
import javafx.stage.Stage;


import java.util.ArrayList;
import java.util.Random;
/* To be able to use Java 13 and Javafx in Intellij i was required to write the following in
   Run -> Edit configurations VM options --module-path pathToJavaFX\javafx-sdk-13.0.2\lib --add-modules javafx.controls,javafx.fxml  */
public class Yahtzee extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        /* Graphics */
        GridPane pane = new GridPane();
        pane.setAlignment(Pos.CENTER);
        pane.setPadding(new Insets(10, 10, 10, 10));
        pane.setHgap(5);
        pane.setVgap(5);
        Label gameTitle = new Label("Yahtzee");
        gameTitle.setFont(new Font("Comfortaa", 30));
        pane.add(gameTitle,0,0);
        /* Creates images and imageviews with a picture */
        Image dice1 = new Image("assignment_2/exercise8/img/d1.png");
        Image dice2 = new Image("assignment_2/exercise8/img/d2.png");
        Image dice3 = new Image("assignment_2/exercise8/img/d3.png");
        Image dice4 = new Image("assignment_2/exercise8/img/d4.png");
        Image dice5 = new Image("assignment_2/exercise8/img/d5.png");
        Image dice6 = new Image("assignment_2/exercise8/img/d6.png");
        ImageView dice1View = new ImageView(dice1);
        ImageView dice2View = new ImageView(dice1);
        ImageView dice3View = new ImageView(dice1);
        ImageView dice4View = new ImageView(dice1);
        ImageView dice5View = new ImageView(dice1);
        dice1View.setPreserveRatio(true);
        dice2View.setPreserveRatio(true);
        dice3View.setPreserveRatio(true);
        dice4View.setPreserveRatio(true);
        dice5View.setPreserveRatio(true);
        dice1View.setFitWidth(100);
        dice2View.setFitWidth(100);
        dice3View.setFitWidth(100);
        dice4View.setFitWidth(100);
        dice5View.setFitWidth(100);

        /* Stores references to the ImageView inside an ArrayList */
        ArrayList<ImageView> imageViews = new ArrayList<>();
        imageViews.add(dice1View);
        imageViews.add(dice2View);
        imageViews.add(dice3View);
        imageViews.add(dice4View);
        imageViews.add(dice5View);

        /* Adds the images to the gridPane */
        pane.add(dice1View, 0 , 1);
        pane.add(dice2View, 1 , 1);
        pane.add(dice3View, 2 , 1);
        pane.add(dice4View, 3 , 1);
        pane.add(dice5View, 4 , 1);

        /* Adds checkboxes to the gridPane */
        CheckBox check1 = new CheckBox();
        CheckBox check2 = new CheckBox();
        CheckBox check3 = new CheckBox();
        CheckBox check4 = new CheckBox();
        CheckBox check5 = new CheckBox();

        /* Stores references to the checkboxes inside an ArrayList */
        ArrayList<CheckBox> checkBoxes = new ArrayList<>();
        checkBoxes.add(check1);
        checkBoxes.add(check2);
        checkBoxes.add(check3);
        checkBoxes.add(check4);
        checkBoxes.add(check5);

        /* Disables the checkboxes at the start */
        check1.setDisable(true);
        check2.setDisable(true);
        check3.setDisable(true);
        check4.setDisable(true);
        check5.setDisable(true);
        /* Adds the checkboxes to the gridPane */
        pane.add(check1, 0, 2);
        pane.add(check2, 1, 2);
        pane.add(check3, 2, 2);
        pane.add(check4, 3, 2);
        pane.add(check5, 4, 2);

        Button rollButton = new Button("Roll the dice");
        pane.add(rollButton, 0, 3);
        Label throwsLeft = new Label("You have 3 rolls left");
        pane.add(throwsLeft, 0, 4);

        /* Not allowed to store variables that are not final inside an eventhandler so an object is used
           to access the values required */
        var ref = new Object() {
            boolean firstThrow = true;
        };
        var ref1 = new Object() {
            int tries = 3;
        };

        /* The game is played through the user clicking the button */
        rollButton.setOnAction( e -> {
            if (ref1.tries <= 0)
                return;
            Random rand = new Random();
             int random = 0;
             /* If it's the first throw */
             if (ref.firstThrow) {
                 /* The first throw, the user is not allowed to select what dices to keep
                    Gets a random number, this random number will decide what image will be loaded */
                 for (int i = 0; i < imageViews.size(); i++) {
                     random = rand.nextInt(6) + 1;
                     if (random == 1)
                         imageViews.get(i).setImage(dice1);
                     if (random == 2)
                         imageViews.get(i).setImage(dice2);
                     if (random == 3)
                         imageViews.get(i).setImage(dice3);
                     if (random == 4)
                         imageViews.get(i).setImage(dice4);
                     if (random == 5)
                         imageViews.get(i).setImage(dice5);
                     if (random == 6)
                         imageViews.get(i).setImage(dice6);
                 }
                 /* Ables the user to select what dices to keep and which to throw again the next turn*/
                 ref.firstThrow = false;
                 check1.setDisable(false);
                 check2.setDisable(false);
                 check3.setDisable(false);
                 check4.setDisable(false);
                 check5.setDisable(false);
                 ref1.tries--;

                 throwsLeft.setText("You have " + ref1.tries + " rolls left.");

                 /* If it's not the first throw */
             } else {
                 /* Gets a random number, this random number will decide what image will be loaded
                    If the player has selected to save a die then that die(image) will remain */
                 for (int i = 0; i < imageViews.size(); i++) {
                     random = rand.nextInt(6) + 1;
                     if (!checkBoxes.get(i).isSelected()) {
                         if (random == 1) {
                             imageViews.get(i).setImage(dice1);
                         }
                         if (random == 2) {
                             imageViews.get(i).setImage(dice2);
                         }
                         if (random == 3) {
                             imageViews.get(i).setImage(dice3);
                         }
                         if (random == 4) {
                             imageViews.get(i).setImage(dice4);
                         }
                         if (random == 5) {
                             imageViews.get(i).setImage(dice5);
                         }
                         if (random == 6) {
                             imageViews.get(i).setImage(dice5);
                         }
                     }
                 }
                 /* Lowers the amount of tries, is used to only allow 3 rolls */
                 ref1.tries--;
                 throwsLeft.setText("You have " + ref1.tries + " rolls left.");
             }
             /* When the amount of tries is 0, the user has used all 3 throws */
             if (ref1.tries == 0) {
                 int [] scores = {0, 0, 0, 0, 0 ,0};
                 int temp = 0; // Used to calculate score

                 /* Saves each occurrence of a die to an array where it represents the amount of times it was present.
                    The index posistion represents each die, and the value the number of occurrences */
                 for (int i = 0; i < imageViews.size(); i++) {
                     if(imageViews.get(i).getImage().equals(dice1)) {
                         scores[0]++;
                     }
                     if(imageViews.get(i).getImage().equals(dice2)) {
                         scores[1]++;
                     }
                     if(imageViews.get(i).getImage().equals(dice3)) {
                         scores[2]++;
                     }
                     if(imageViews.get(i).getImage().equals(dice4)) {
                         scores[3]++;
                     }
                     if(imageViews.get(i).getImage().equals(dice5)) {
                         scores[4]++;
                     }
                     if(imageViews.get(i).getImage().equals(dice6)) {
                         scores[5]++;
                     }
                 }

                 /* Calculate the score and set the text equal to the score the player gets */
                 for (int i = 0; i < scores.length; i++) {
                     if (scores[i] == 5) {
                         throwsLeft.setText("You got Yahtzee");
                         return;
                     }
                 }
                 for (int i = 0; i < scores.length; i++) {
                     if (scores[i] == 4) {
                         throwsLeft.setText("You got a 4 pair");
                         return;
                     }
                 }
                 for (int i = 0; i < scores.length; i++) {
                     if (scores[i] == 3) {
                         throwsLeft.setText("You got three of a kind");
                         return;
                     }
                 }
                 /* If the score is equal to 3 in one index at the array, it then loops again to see if there is
                    another index has the value of 2. */
                 for(int i = 0; i < scores.length; i++) {
                     if (scores[i] == 3)
                         for (int y = 0; y < scores.length; y++) {
                             if (scores[y] < 3 && scores[y] == 2) {
                                 throwsLeft.setText("You got full house");
                                 return;
                             }
                         }
                 }
                 /* Checks to see if each index in the array has a value above 0, if all of them has has values
                    above 1 then it would be a straight */
                 for (int i = 0; i < scores.length; i++) {
                     if (scores[i] == 1) {
                         temp++;
                     }
                     if (temp == 5) {
                         throwsLeft.setText("You got big straight");
                         return;
                     }
                 }
                 /* Checks if the index is above 0, if the element in the next index is 0 then it will reset the counter
                    If the counter reaches 3 then the user has a small straight */
                 temp = 0;
                 for (int i = 0; i < scores.length; i++) {
                     if (scores[i] > 0)
                         temp++;
                     if ((i + 1) != 6  && scores[i + 1] == 0)
                         temp = 0;
                     if(temp == 3) {
                         throwsLeft.setText("You got small straight");
                         return;
                     }
                 }
                 /* Checks if any value occurs 2 times */
                 temp = 0;
                 for (int i = 0; i < scores.length; i++) {
                     if (scores[i] == 2)
                         temp++;
                     if (temp <= 1) {
                         throwsLeft.setText("You got pair");
                         return;
                     }
                 }
             }
        });
        Scene scene = new Scene(pane, 600, 250);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}