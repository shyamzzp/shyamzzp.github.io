import subprocess

# List of commands
commands = [
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/7158109457 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5512806180 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5450781800 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5450774908 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5450656727 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5446101044 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5430333434 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5412626597 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5409298927 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5371275677 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5363691589 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5354307507 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5354186232 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5352667685 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5332986898 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5332878661 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5322995067 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5312586415 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5310355121 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5310108911 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5305391261 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5302041665 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5301923684 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5300281952 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5300201499 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5299761311 -X DELETE",
    "gh api repos/shyamzzp/shyamzzp.github.io/actions/runs/5299581774 -X DELETE",
    # Add more commands as needed
]

# Run commands one by one
for command in commands:
    try:
        # Execute the command
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {command}")
        print(f"Error message: {e}")
