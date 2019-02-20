#--------------------------------------------------------------
# Workflows
#--------------------------------------------------------------

workflow "Test on Push" {
  on = "push"
  resolves = [
    "Test on Push"
  ]
}

action "Install packages" {
  uses = "docker://node:11"
  runs = "/bin/sh"
  args = ["-c", "npm i"]
}

action "Test on Push" {
  uses = "docker://node:11"
  needs = ["Install packages"]
  runs = "/bin/sh"
  args = ["-c", "npm t"]
}
