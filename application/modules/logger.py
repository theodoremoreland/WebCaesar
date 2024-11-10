import logging
import logging.handlers as handlers

logger = logging.getLogger("web-caesar")
fileHandler = handlers.RotatingFileHandler("web-caesar.log", maxBytes=10000)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

fileHandler.setFormatter(formatter)
logger.addHandler(fileHandler)
logger.setLevel(
    logging.DEBUG
)  # This needs to be set. logger.error(), logger.debug(), etc will not work without this.
