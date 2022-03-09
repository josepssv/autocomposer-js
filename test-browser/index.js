$(document).ready(function () {
  $("#button-play-solo").click(function () {
    var melody = $("#solo-melody").val().split(" ");
    AutoComposerJS.midiPlayer.playMelodySolo(melody);
  });

  $("#button-play").click(function () {
    var melody1 = $("#first-melody").val().split(" ");
    var melody2 = $("#second-melody").val().split(" ");
    var melody3 = $("#third-melody").val().split(" ");
    AutoComposerJS.midiPlayer.playMelodyWithAccompaniment(
      melody1,
      melody2,
      melody3
    );
  });

  $("#btn-melody-gen").click(function () {
    var isRaw = $("#chk-raw")[0].checked;
    var isLimited = $("#chk-limit")[0].checked;
    var isFiltered = $("#chk-filtered")[0].checked;
    var chordProgression = "Gm D7".split(" ");
    var generatorOptions = {
      raw: isRaw,
      limit: isLimited,
      filter: isFiltered,
    };
    console.log(
      "Generating melodies... generatorOptions=" +
        JSON.stringify(generatorOptions)
    );
    // How are we going to output melodies for testing?
    // VexTab may be the easiest way (since it was built for that)
    var outputText = JSON.stringify(
      AutoComposerJS.melody.buildSimpleMelodies(
        chordProgression,
        generatorOptions
      ),
      2
    );

    console.log(outputText);

    $("#output-melodies").html(outputText);
  });

  var notesmidi =
    "                     A0 A#0 B0 C1 C#1 D1 D#1 E1 F1 F#1 G1 G#1 A1 A#1 B1 C2 C#2 D2 D#2 E2 F2 F#2 G2 G#2 A2 A#2 B2 C3 C#3 D3 D#3 E3 F3 F#3 G3 G#3 A3 A#3 B3 C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 A#4 B4 C5 C#5 D5 D#5 E5 F5 F#5 G5 G#5 A5 A#5 B5 C6 C#6 D6 D#6 E6 F6 F#6 G6 G#6 A6 A#6 B6 C7 C#7 D7 D#7 E7 F7 F#7 G7 G#7 A7 A#7 B7 C8";
  var notemidi = notesmidi.split(" ");

  soloMelodies = [];

  $("#btn-melody-gen-play").click(function () {
    var isRaw = $("#chk-raw-play")[0].checked;
    var isLimited = $("#chk-limit-play")[0].checked;
    var isFiltered = $("#chk-filtered-play")[0].checked;
    var sm = $("#solo-melody-gen-play").val();
    var chii = $("#chord-interval").val();
    var chi = chii.split(" ").map(Number);

    var chordProgression = sm.split(" ");
    var generatorOptions = {
      raw: isRaw,
      limit: isLimited,
      filter: isFiltered,
    };
    prgo = generatorOptions.raw;

    var acc = AutoComposerJS.melody.buildSimpleMelodies(
      chordProgression,
      generatorOptions
    );
    generatorOptions.raw = true;
    var arm = AutoComposerJS.melody.buildSimpleMelodies(
      chordProgression,
      generatorOptions
    );
    if (generatorOptions.raw) {
      var compass = parseInt($("#compass").val());
      var am = [];
      for (a = 0; a < arm.length; a++) {
        r = arm[a].split(" ");
        am = am.concat(r);
      }
      var contc = 1;
      for (a = 0; a < am.length; a++) {
        toc = 0;
        if (am[a].substring(0, 1) == "C") {
          toc = 1;
        }
        if (contc == compass || toc == 1) {
          nr = notemidi.indexOf(am[a]);
          if (chi.length > 1) {
            am[a] +=
              " " +
              notemidi[nr + chi[0]] +
              " " +
              notemidi[nr + chi[0] + chi[1]];
            // if(toc==1){break}
          }
        }
        contc += 1;
        if (contc > compass) {
          contc = 1;
        }
      }
      soloMelodies = am;
      if (prgo) {
        outputText = JSON.stringify(am, 2);
      } else {
        outputText = JSON.stringify(acc, 2);
      }
    }
    $("#button-play-melodies").css("display", "block");
    $("#output-melodies-gen-play").html(outputText);
  });

  $("#button-play-melodies").click(function () {
    AutoComposerJS.midiPlayer.playMelodySolo(soloMelodies);
  });
});
