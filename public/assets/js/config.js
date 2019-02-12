// APPLICATION BASE URL
const BASE_URL = 'http://localhost:8090';

// DATA SERVICE URL(USED TO PULL PROJECT JSON)
const SERVICE_URL = 'http://localhost:8090';

var editorConfig;
var studyConfig;

function setBrightness(newvalue) {
  if (!window.editorConfig.brightness || window.editorConfig.brightness != newvalue) {
    window.editorConfig.brightness = newvalue;
    window.studyConfig.editorConfig = window.editorConfig;
    updateStudyConfig(window.studyConfig);
  }
}

function setContrast(newvalue) {
  if (!window.editorConfig.contrast || window.editorConfig.contrast != newvalue) {
    window.editorConfig.contrast = newvalue;
    window.studyConfig.editor = window.editorConfig;
    updateStudyConfig(window.studyConfig);
  }
}

function setPan(newx, newy) {
  if (!window.editorConfig.pan || window.editorConfig.pan.x != newx ||
     window.editorConfig.pan.y != newy) {
    window.editorConfig.pan.x = newx;
    window.editorConfig.pan.y = newy;
    window.studyConfig.editor = window.editorConfig;
    updateStudyConfig(window.studyConfig);
  }
}

function setScale(newscale) {
  if (!window.editorConfig.zoom || window.editorConfig.zoom != newvalue) {
    window.editorConfig.zoom = newscale;
    window.studyConfig.editor = window.editorConfig;
    updateStudyConfig(window.studyConfig);
  }
}

function setSelectedClass(newSelectedClass) {
  if (!window.studyConfig.editor.selectedClass ||
      window.studyConfig.editor.selectedClass != newSelectedClass) {
    window.studyConfig.editor.selectedClass = newSelectedClass;
    updateStudyConfig(window.studyConfig);
  }
}
