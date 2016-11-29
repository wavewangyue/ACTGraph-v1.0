package act.graph.controller;

/**
 * Created by wave on 16-8-16.
 */

import act.graph.service.ParserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class JustForTestController {


    @Autowired
    ParserService parserService;

    @RequestMapping(value = "/parser.do", method = RequestMethod.GET, produces="text/html;charset=UTF-8")
    @ResponseBody
    public String parseforme() throws Exception {
        parserService.parseDataSet();
        //parserService.parseSentence("《机械设计基础》这本书的作者是谁");
        return null;
    }

}

