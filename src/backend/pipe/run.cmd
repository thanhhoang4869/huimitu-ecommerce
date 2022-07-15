@echo off
echo Begin running...
"P:\KNIME\knime.exe" -nosave -consoleLog -nosplash -reset -application org.knime.product.KNIME_BATCH_APPLICATION -workflowFile=".\huimitu-frequent-item.knwf"
echo Done