# Load the jsonlite package for JSON serialization
library(jsonlite)

# Get the home directory
if (Sys.info()['sysname'] == "Windows") {
  home_dir <- Sys.getenv("APPDATA")
  dir <- file.path(home_dir, "biostatapp-electron")
} else {
  home_dir <- Sys.getenv("HOME")
  dir <- file.path(home_dir, "Library", "Application Support", "biostatapp-electron")
}

input_file <- file.path(dir, "input.json")
output_file <- file.path(dir, "output.json")

print(paste("Reading input file: ", input_file))
print(paste("Writing output file: ", output_file))

# Read input JSON file to get the lists
input_data <- fromJSON(input_file)

# Extract the lists from the input JSON
list1 <- input_data$list1
list2 <- input_data$list2

# Merge and sort the lists
merged_sorted_list <- sort(c(list1, list2))

# Create an output list to store the result
output_data <- list(
  sorted_list = merged_sorted_list
)

# Print the contents of output_data
print(output_data)

# Call toJSON and store the result in a variable
json_output <- toJSON(output_data, pretty = TRUE, auto_unbox = TRUE)

# Print the JSON output
print(json_output)

# Get the directory of the input file
input_dir <- dirname(input_file)

# Create the full path for the output file
output_file_path <- file.path(input_dir, output_file)

# Write the JSON output to the file
writeLines(json_output, output_file)

print(paste("Finished writing to output file: ", output_file_path))

