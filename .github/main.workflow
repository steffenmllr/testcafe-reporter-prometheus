#--------------------------------------------------------------
# Workflows
#--------------------------------------------------------------

workflow "Test on Push" {
  on = "push"
  resolves = [
    "Test"
  ]
}

action "Install packages" {
  uses = "docker://node:11"
  runs = "/bin/sh"
  args = ["-c", "npm i"]
}

action "Test" {
  uses = "docker://node:11"
  needs = ["Install packages"]
  runs = "/bin/sh"
  args = ["-c", "npm t"]
}
