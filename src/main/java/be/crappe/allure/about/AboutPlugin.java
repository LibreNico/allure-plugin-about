package be.crappe.allure.about;

import io.qameta.allure.Aggregator;
import io.qameta.allure.Reader;
import io.qameta.allure.core.Configuration;
import io.qameta.allure.core.LaunchResults;
import io.qameta.allure.core.ResultsVisitor;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class AboutPlugin implements Aggregator, Reader {

    public static final String JSON_FILE_NAME = "about.json";
    private static String aboutData;


    @Override
    public void aggregate(final Configuration configuration,
                          final List<LaunchResults> launches,
                          final Path outputDirectory) throws IOException {
        final Path dataFolder = Files.createDirectories(outputDirectory.resolve("data"));
        final Path dataFile = dataFolder.resolve("about.json");
        try (OutputStream out = Files.newOutputStream(dataFile)) {
            IOUtils.write(aboutData, out);
        }
    }


    @Override
    public void readResults(Configuration configuration, ResultsVisitor resultsVisitor, Path directory) {
        final Path aboutFile = directory.resolve(JSON_FILE_NAME);
        if (Files.exists(aboutFile)) {
            try (InputStream inputStream = Files.newInputStream(aboutFile)) {
                aboutData = IOUtils.toString(inputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{
            System.err.println("no file "+aboutFile.getParent()+"/"+aboutFile.getFileName());
        }
    }




}